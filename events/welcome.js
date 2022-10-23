const generateImage = require("D://Important//Code//ExampleBot//handlers//welcomeHandler.js")

module.exports = {
  name: "guildMemberAdd",

  async execute(member) {
    const welcomeChannelId = "1024977824764928052"

    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to the server!`,
        files: [img]
    })
  },
};