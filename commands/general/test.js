const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  adminGuildOnly: false,
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('test'),
  async execute(interaction) {

    //const file = new AttachmentBuilder('../images', { name: 'map-station.jpg' });
    //const file = new AttachmentBuilder('../images/map-station.jpg');
    const exampleEmbed = new EmbedBuilder()
      .setTitle('Cruise');

    return interaction.reply({ embeds: [exampleEmbed] });
  },
};