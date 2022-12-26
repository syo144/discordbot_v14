//https://techblog.roxx.co.jp/entry/2021/04/23/064837

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  adminGuildOnly: false,
  data: new SlashCommandBuilder()
    .setName('team')
    .setDescription('2つのチームに分けます'),
  async execute(interaction) {
    // コメントしたメンバーを取得
    const authorId = interaction.user.id

    console.log(interaction.member.voice.channel)

    const channels = interaction.guild.channels
    const voiceCH = interaction.member.voice.channel
    /*
    const voiceCH = channels.cache.find(ch => {
      //https://discord-api-types.dev/api/discord-api-types-v10/enum/ChannelType
      if (ch.type !== 2) {
        return false
      }
      // ボイスチャンネルのうち、コメントしたメンバーがいるチャンネルを取得
      //return !!ch.members.filter(member => member.user.id === authorId)
      return ch.members.filter(member => member.user.id === authorId)
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
      let nafArray = [];
      let edenArray = [];
      for (let i = 0; i < array.length; i++) {
        if (i % 2 === 0) {
          nafArray.push(array[i])
        } else {
          edenArray.push(array[i])
        }
      }
      return [nafArray, edenArray]
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
    console.log(voiceCH.id)
    const shuffledMembers = shuffleArray(voiceCHMemberNames)
    const divideMembers = divideArray(shuffledMembers)

    // リストにしてテキストチャンネルに送信する
    const members =
      'NAF: ' + divideMembers[0].join(', ') +
      '\nEDEN: ' + divideMembers[1].join(', ')

    const sendMessage = members || 'メンバー取得できなかったよ'

    //interaction.channel.send(sendMessage)
    //console.log(sendMessage);

    return interaction.reply(sendMessage);
  },
};