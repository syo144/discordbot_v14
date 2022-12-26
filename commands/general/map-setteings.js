const { SlashCommandBuilder } = require('discord.js');
const config = require("../../config.js");
const fs = require('node:fs');
require('dotenv').config() //envを読みこむ
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

module.exports = {
  adminGuildOnly: false,
  data: new SlashCommandBuilder()
    .setName('map-setting')
    .setDescription('/mapで選択されるマップを制御する')
    .addSubcommand(subcommand =>
      subcommand
        .setName('maplist')
        .setDescription('抽選されるマップリストを表示'))
    //.addUserOption(option => option.setName('target').setDescription('The user')))
    .addSubcommand(subcommand =>
      subcommand
        .setName('ban')
        .setDescription('選択したマップが抽選されなくなる')
        .addStringOption(option =>
          option
            .setName('category')
            .setDescription('The gif category')
            .setRequired(true)
            .addChoices(
              { name: 'Airport - エアポート', value: 'Airport - エアポート' },
              { name: 'Bio Lab - バイオラボ', value: 'Bio Lab - バイオラボ' },
              { name: 'Broadcast - ブロードキャスト', value: 'Broadcast - ブロードキャスト' },
              { name: 'Cloud9 - クラウド9', value: 'Cloud9 - クラウド9' },
              { name: 'Cruise - クルーズ', value: 'Cruise - クルーズ' },
              { name: 'Dam - ダム', value: 'Dam - ダム' },
              { name: 'Discovery - ディスカバリー', value: 'Discovery - ディスカバリー' },
              { name: 'Downtown - ダウンタウン', value: 'Downtown - ダウンタウン' },
              { name: 'Haruyama - 春山', value: 'Haruyama - 春山' },
              { name: 'Ironwork - アイアンワーク', value: 'Ironwork - アイアンワーク' },
              { name: 'Island - アイランド', value: 'Island - アイランド' },
              { name: 'Mart - マート', value: 'Mart - マート' },
              { name: 'Observatory - 観測所', value: 'Observatory - 観測所' },
              { name: 'Oceanfront - オーシャンフロント', value: 'Oceanfront - オーシャンフロント' },
              { name: 'Outpost - 前哨基地', value: 'Outpost - 前哨基地' },
              { name: 'Rust - ラスト', value: 'Rust - ラスト' },
              { name: 'Station - ステーション', value: 'Station - ステーション' },
              { name: 'Titan - タイタン', value: 'Titan - タイタン' },
              { name: 'Tower - タワー', value: 'Tower - タワー' },
            )))
    .addSubcommand(subcommand =>
      subcommand
        .setName('unban')
        .setDescription('選択したマップが抽選されるようになる')
        .addStringOption(option =>
          option
            .setName('category')
            .setDescription('The gif category')
            .setRequired(true)
            .addChoices(
              { name: 'Airport - エアポート', value: 'Airport - エアポート' },
              { name: 'Bio Lab - バイオラボ', value: 'Bio Lab - バイオラボ' },
              { name: 'Broadcast - ブロードキャスト', value: 'Broadcast - ブロードキャスト' },
              { name: 'Cloud9 - クラウド9', value: 'Cloud9 - クラウド9' },
              { name: 'Cruise - クルーズ', value: 'Cruise - クルーズ' },
              { name: 'Dam - ダム', value: 'Dam - ダム' },
              { name: 'Discovery - ディスカバリー', value: 'Discovery - ディスカバリー' },
              { name: 'Downtown - ダウンタウン', value: 'Downtown - ダウンタウン' },
              { name: 'Haruyama - 春山', value: 'Haruyama - 春山' },
              { name: 'Ironwork - アイアンワーク', value: 'Ironwork - アイアンワーク' },
              { name: 'Island - アイランド', value: 'Island - アイランド' },
              { name: 'Mart - マート', value: 'Mart - マート' },
              { name: 'Observatory - 観測所', value: 'Observatory - 観測所' },
              { name: 'Oceanfront - オーシャンフロント', value: 'Oceanfront - オーシャンフロント' },
              { name: 'Outpost - 前哨基地', value: 'Outpost - 前哨基地' },
              { name: 'Rust - ラスト', value: 'Rust - ラスト' },
              { name: 'Station - ステーション', value: 'Station - ステーション' },
              { name: 'Titan - タイタン', value: 'Titan - タイタン' },
              { name: 'Tower - タワー', value: 'Tower - タワー' },
            ))),
  async execute(interaction) {
    let banMapList = [];
    banMapList = data.banMapList;

    console.log(banMapList);

    /*
    db.list().then(keys => {
      if (!keys.includes("banMapList")) {
        db.set("banMapList", []).then(() => { });
      }
    });
    await db.get("banMapList").then(value => { banMapList = value })
    console.log(banMapList)
    */

    if (interaction.options.getSubcommand() === 'maplist') {
      //TODO:mapsとbanlistを照らし合わせて、一致するものは~~xxx~~~と表示。

      let arr = config.maps.filter(i => banMapList.indexOf(i) == -1)

      let mapList =
        arr.join('\n') +
        '\n' +
        banMapList.map(data => data = '~~' + data + '~~').join('\n');
      return interaction.reply(mapList)
      /*
      for(let i=0; i < config.maps.length; i++){
        if(config.maps.includes){
          
        } else {
          
        }
      }     
      */
      /*
      return interaction.reply('user');
      */
    } else if (interaction.options.getSubcommand() === 'ban') {
      if (banMapList.includes(interaction.options.getString("category"))) {
        return interaction.reply("すでに選ばれません")
      } else {
        banMapList.push(interaction.options.getString("category"))
        data.banMapList = banMapList;
        fs.writeFileSync('./data.json', JSON.stringify(data));
        return interaction.reply(`\`${interaction.options.getString("category")}\`は選ばれなくなりました`)
      }
      /*
      return interaction.reply('server');
      */
    } else if (interaction.options.getSubcommand() === 'unban') {
      if (banMapList.includes(interaction.options.getString("category"))) {
        const res = banMapList.filter((item) => {
          return (item != interaction.options.getString("category"))
        })
        console.log(res);
        data.banMapList = res;
        fs.writeFileSync('./data.json', JSON.stringify(data));
        return interaction.reply(`\`${interaction.options.getString("category")}\`は選ばれるようになりました`)
      } else {
        return interaction.reply("すでに選ばれます")
      }
      /*
      const chosenString = interaction.options.getString("category")
      selectedFruits.push(interaction.options.getString("category"))
      console.log(selectedFruits)
      //console.log(TestNum)
      //config.banMap.push(selectedFruits)
      return interaction.reply(config.banMap);
      */
    } else {
      return interaction.reply('~~etc~~');
    }

    return interaction.reply('~~etc~~');
  },
};
