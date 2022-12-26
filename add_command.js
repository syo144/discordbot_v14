require('dotenv').config()
const config = require("./config.js");
const token = config.token;
const { REST, Routes } = require('discord.js');
const rest = new REST({ version: "10" }).setToken(token);
const fs = require("fs");

const clientId = config.clientId;
const testGuildId = config.dev.testGuildId;

let command_int = 0;
const globalCommands = [];
const adminGuildCommands = [];
const commandFolders = fs.readdirSync("./commands");

function cmdToArray(array, command, file, notice = "") {
  try {
    array.push(command.data.toJSON());
    command_int++;
    console.log(`${notice} ${file} が追加されました。`);
  } catch (error) {
    console.log(`\u001b[31m${notice} ${file} はエラーにより追加されませんでした。\nエラー内容\n ${error}\u001b[0m`);
  }
}

async function putToDiscord(commands, guild = false) {
  if (guild) {
    await rest.put(
      Routes.applicationGuildCommands(clientId, guild),
      { body: commands },
    )
  } else {
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );
  }
}

for (const folder of commandFolders) {
  console.log(`\u001b[32m===${folder} commands===\u001b[0m`);
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    if (command.adminGuildOnly) {
      cmdToArray(adminGuildCommands, command, file, "[Admin]");
      continue;
    }
    if (command.globalGuild) continue;
    cmdToArray(globalCommands, command, file, "[Global]");
  }
  console.log(`\u001b[32m===${folder} added===\u001b[0m`);
}

(async () => {
  try {
    console.log(`${command_int}個のスラッシュコマンドを登録/再登録します…`);

    //Admin
    await putToDiscord(adminGuildCommands, testGuildId);
    console.log("管理コマンドを正常に登録しました。");

    //Global
    await putToDiscord(globalCommands);
    console.log("グローバルコマンドを正常に登録しました。");

    console.log("全てのスラッシュコマンドを正常に登録しました！");
  } catch (error) {
    console.error(error);
  }
})();