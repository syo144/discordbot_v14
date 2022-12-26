const { randomInt } = require('crypto');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  adminGuildOnly: false,
  data: new SlashCommandBuilder()
    .setName('map')
    .setDescription('ランダムなマップを抽選します'),
  async execute(interaction) {
    const maps = [
      { name: "Airport - エアポート" },
      { name: "Bio Lab - バイオラボ" },
      { name: "Broadcast - ブロードキャスト" },
      { name: "Cloud9 - クラウド9" },
      { name: "Cruise - クルーズ" },
      { name: "Dam - ダム" },
      { name: "Discovery - ディスカバリー" },
      { name: "Downtown - ダウンタウン" },
      { name: "Haruyama - 春山" },
      { name: "Ironwork - アイアンワーク" },
      { name: "Island - アイランド" },
      { name: "Mart - マート" },
      { name: "Observatory - 観測所" },
      { name: "Oceanfront - オーシャンフロント" },
      { name: "Outpost - 前哨基地" },
      { name: "Rust - ラスト" },
      { name: "Station - ステーション" },
      { name: "Titan - タイタン" },
      { name: "Tower - タワー" },
    ]
    /*
    if (value) return interaction.reply(maps[value]);
    return interaction.reply(`The options value is: \`${value}\``);
    */

    let value = randomInt(maps.length - 1);
    const exampleEmbed = new EmbedBuilder()
      .setTitle(maps[value].name);
    return interaction.reply({ embeds: [exampleEmbed] });
  },
};