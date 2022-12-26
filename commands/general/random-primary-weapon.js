const { randomInt } = require('crypto');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  adminGuildOnly: false,
  data: new SlashCommandBuilder()
    .setName('weapon')
    .setDescription('ランダムなプライマリー武器を抽選します'),
  async execute(interaction) {
    const weapons = [
      "AK-12",
      "FAMAS G2",
      "AUG A3",
      "AK-47",
      "SA58 OSW",
      "ARX160",
      "SG553",
      "SCAR-H",
      "TAR-21",
      "MSBS 556B",
      "G36C",
      "M4 ACC-M",
      "M39 EMR",
      "K2C",
      "HK417",
      "AN-94",
      "Type 89",
      "QBZ 95",
      "Honey Badger",
      "OTs-14",
      "M16",
      "Training M4",
      "MP7A1",
      "P90 TR",
      "Vector",
      "PP-2000",
      "PDR-C",
      "LWRC 45",
      "AR-57",
      "PP-90M1",
      "MP5 A5",
      "MP9",
      "Vz.61",
      "Mx4 Storm",
      "Thompson",
      "SVD",
      "CF-X50",
      "PSG-1",
      "DSR-1",
      "Blaser R93",
      "VSS",
      "Cheytac",
      "L96A1",
      "Kar98k",
      "Ultimax 100",
      "MG3",
      "PKP",
      "MK46",
      "M240 LWS",
      "Balistic Shield",
    ]
    let value = randomInt(weapons.length - 1);
    if (value) return interaction.reply(weapons[value]);
    return interaction.reply(`The options value is: \`${value}\``);
  },
};
