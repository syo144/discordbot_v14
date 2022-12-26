//https://techblog.roxx.co.jp/entry/2021/04/23/064837

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  adminGuildOnly: false,
  data: new SlashCommandBuilder()
    .setName('team3')
    .setDescription('3つのチームに分けます'),
  async execute(interaction) {
    // コメントしたメンバーを取得
    const authorId = interaction.user.id

    const channels = interaction.guild.channels
    const voiceCH = interaction.member.voice.channel
    /*
    const voiceCH = channels.cache.find(ch => {
      //https://discord-api-types.dev/api/discord-api-types-v10/enum/ChannelType
      if (ch.type !== 2) {
        return false
      }
      // ボイスチャンネルのうち、コメントしたメンバーがいるチャンネルを取得
      return !!ch.members.filter(member => member.user.id === authorId)
    })

    if (!voiceCH) {
      console.error('チャンネルが見つかりません')
      return
    }
    */

    //与えられた配列をシャッフルして返す
    const shuffleArray = (array) => {
      for (let i = (array.length - 1); 0 < i; i--) {
        var r = Math.floor(Math.random() * (i + 1))

        var tmp = array[i]
        array[i] = array[r]
        array[r] = tmp
      }
      return array
    }
    const divideArray = (array) => {
      let firstArray = [];
      let secondArray = [];
      let thirdArray = [];
      for (let i = 0; i < array.length; i++) {
        if (i % 3 === 0) {
          firstArray.push(array[i])
        } else if (i % 3 == 1) {
          secondArray.push(array[i])
        } else {
          thirdArray.push(array[i])
        }
      }
      return [firstArray, secondArray, thirdArray]
    }

    //console.log(voiceCH.id)
    //const voiceCHMemberNames = voiceCH.members

    /*
    await channels.fetch()
    const a = await channels.cache.get(voiceCH.id)
    console.log(a.members)
    */

    /*
    console.log(voiceCH.members.map(member => member.user.username))
    await channels.cache.fetch()
    console.log(voiceCH.members.map(member => member.user.username))
    */

    // voice チャンネルに参加しているメンバー一覧を取得
    const voiceCHMemberNames = voiceCH.members.filter(member => !member.user.bot)
      .map(member => member.user.username)
    const shuffledMembers = shuffleArray(voiceCHMemberNames)
    const divideMembers = divideArray(shuffledMembers)

    // リストにしてテキストチャンネルに送信する
    const members =
      '①: ' + divideMembers[0].join(', ') +
      '\n②: ' + divideMembers[1].join(', ') +
      '\n③: ' + divideMembers[2].join(', ')

    const sendMessage = members || 'メンバー取得できなかったよ'

    //interaction.channel.send(sendMessage)
    //console.log(sendMessage);

    return interaction.reply(sendMessage);
  },
};