const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require("./config.js");
const functions = require("./functions.js");
//let data = require("./data.json")
require('dotenv').config() //envを読みこむ

/*
console.log(data.name)
data.name = "abc"
console.log(data.name)
fs.writeFileSync('./data.json', JSON.stringify(data));
*/

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers
  ]
});// Create a new client instance

//client.on('debug', console.log);

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});


// コマンドハンドリング
client.commands = new Collection();
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
  console.log(`\u001b[32m===${folder} commands===\u001b[0m`);
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    try {
      client.commands.set(command.data.name, command);
      console.log(`${command.data.name} がロードされました。`);
    } catch (error) {
      console.log(`\u001b[31m${command.data.name} はエラーによりロードされませんでした。\nエラー内容\n ${error}\u001b[0m`);
    }
  }
  console.log(`\u001b[32m===${folder} loaded===\u001b[0m`);
}


// コマンドが来た時
client.on("interactionCreate", async i => {
  if (!i.isCommand()) return;
  const command = client.commands.get(i.commandName);
  if (!command) return;

  // DM専用コマンド
  if (command.guildOnly && !i.inGuild()) {
    const embed = new EmbedBuilder()
      .setTitle("エラー")
      .setDescription("このコマンドはDMでは実行できません。")
      .setColor(0xFF0000)
    i.reply({ embeds: [embed] })
    return;
  }

  // こういうやつはclientに生やすと使いやすくなる
  client.func = functions;
  client.config = config;

  // 実行

  try {
    await command.execute(i, client);
    /*
    const log = new EmbedBuilder()
      .setTitle("コマンド実行ログ")
      .setDescription(`${i.user.tag}(${i.user.id}) がコマンドを実行しました。`)
      .setColor(config.color)
      .setTimestamp()
      .setThumbnail(i.user.displayAvatarURL({ dynamic: true }))
      .addFields({ name: "コマンド", value: "```\n" + i.toString() + "\n```" })
      .addFields({ name: "実行サーバー", value: "```\n" + `${i.guild.name}(${i.guild?.id ?? "DM"})` + "\n```", inline: true })
      .addFields({ name: "実行ユーザー", value: "```\n" + `${i.user.tag}(${i.user.id})` + "\n```", inline: true })
      .setFooter({ text: String(i.id) })
    client.channels.fetch(config.logch.command).then(c => c.send({ embeds: [log] }));
    */
  } catch (error) {
    console.error(error);
  }
});

// エラー処理 (これ入れないとエラーで落ちる。本当は良くないかもしれない)
process.on("uncaughtException", error => {
  console.error(`[${functions.timeToJST(Date.now(), true)}] ${error.stack}`);
  const embed = new EmbedBuilder()
    .setTitle("ERROR - uncaughtException")
    .setDescription("```\n" + error.stack + "\n```")
    .setColor(0xFF0000)
    .setTimestamp();
  client.channels.fetch(config.logch.error).then(c => c.send({ embeds: [embed] }));
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(`\u001b[31m[${functions.timeToJST(Date.now(), true)}] ${reason}\u001b[0m\n`, promise);
  const embed = new EmbedBuilder()
    .setTitle("ERROR - unhandledRejection")
    .setDescription("```\n" + reason + "\n```")
    .setColor(0xFF0000)
    .setTimestamp();
  client.channels.fetch(config.logch.error).then(c => c.send({ embeds: [embed] }));
});

//VCの入退室
client.on('voiceStateUpdate', async (oldState, newState) => {
  /*
  try {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  } catch (error) {
    console.error(error);
  }
  */
  const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

  if (data.vcInfo === "on") {
    const channel = oldState.member.guild.channels.cache.find(ch => ch.name === config.sendCh);
    if (oldState.channelId === null && newState.channelId !== null) {
      if (oldState.member.user.tag === config.hoge) {
        const exampleEmbed = new EmbedBuilder()
          .setTitle('参上！！');
        return channel.send({ embeds: [exampleEmbed] });
      } else {
        if (oldState.member.nickname !== null) {
          return channel.send(`${oldState.member.nickname}さんが入室しました。`);
        } else {
          return channel.send(`${oldState.member.user.tag.slice(0, -5)}さんが入室しました。`);
        }
      }
    }
    else if (oldState.channelId !== null && newState.channelId === null) {
      if (newState.member.nickname !== null) {
        return channel.send(`${newState.member.nickname}さんが退出しました。`);
      } else {
        return channel.send(`${newState.member.user.tag.slice(0, -5)}さんが退出しました。`);
      }
    }
  }
});


/*
// APIサーバー (UptimeRobot用)
const express = require("express");
const app = express();

// ルーティングの設定
app.get("/", (req, res) => {
  const data = {
    "message": "Hello world!",
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(data);
});

app.listen(3000, () => {
  console.log(`Opened API Server`);
});
*/

// ログイン
client.login(config.token);