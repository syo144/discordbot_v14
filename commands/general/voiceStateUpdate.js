const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
require('dotenv').config() //envを読みこむ
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

module.exports = {
  adminGuildOnly: false,
  data: new SlashCommandBuilder()
    .setName('vc-info')
    .setDescription('入退室通知')
    .addSubcommand(subcommand =>
      subcommand
        .setName('on')
        .setDescription('入退室通知をオンにします'))
    //.addUserOption(option => option.setName('target').setDescription('The user')))
    .addSubcommand(subcommand =>
      subcommand
        .setName('off')
        .setDescription('入退室通知をオフにします')),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'on') {
      data.vcInfo = "on"
      fs.writeFileSync('./data.json', JSON.stringify(data));
      return interaction.reply('入退室通知をオンにしました');
    } else if (interaction.options.getSubcommand() === 'off') {
      data.vcInfo = "off"
      fs.writeFileSync('./data.json', JSON.stringify(data));
      return interaction.reply('入退室通知をオフにしました');
    } else {

    }
  },
};
