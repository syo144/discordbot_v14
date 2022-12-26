const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  adminGuildOnly: true,
  data: new SlashCommandBuilder() // スラッシュコマンド登録のため
    .setName("ping")
    .setDescription("Ping値を測定"),

  async execute(i, client) {
    const embed = new EmbedBuilder()
      .setTitle("Ping")
      .setDescription("Pong!")
      .addFields("WebSocket", `**${client.ws.ping} ms**`, true)
      .addFields("コマンド受信", `**${new Date() - i.createdAt} ms**`, true)
      .setColor(client.config.color)
      .setTimestamp();
    i.reply({ embeds: [embed] });
  },
}