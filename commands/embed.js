const { SlashCommandBuilder, Colors, PermissionFlagsBits} = require('discord.js');
const { guildid } = require('D:\\Important\\Code\\ExampleBot\\config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Embed Creator')
        .addChannelOption(option => 
            option.setName("channel")
                .setDescription("The channel where the bot will send the embed.")
                .setRequired(false)
        )
        .addStringOption(option => 
            option.setName("title")
                .setDescription("The embed title.")
                .setRequired(false)
        )
        .addStringOption(option => 
            option.setName("description")
                .setDescription("The embed description.")
                .setRequired(false)
        )
        .addStringOption(option => 
            option.setName("image")
                .setDescription("The embed image.")
                .setRequired(false)
        )
        .addStringOption(option => 
            option.setName("author")
                .setDescription("The embed author.")
                .setRequired(false)
        )
        .addStringOption(option => 
            option.setName("url")
                .setDescription("The embed url.")
                .setRequired(false)
        )
        .addStringOption(option => 
            option.setName("thumbnail")
                .setDescription("The embed thumbnail.")
                .setRequired(false)
        )
        .addStringOption(option => 
            option.setName("footer")
                .setDescription("The embed footer.")
                .setRequired(false)
        )
        .addStringOption(option => 
            option.setName("footer-image")
                .setDescription("The embed footer image. Only works if there is already a footer.")
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        const channel = interaction.options.getChannel("channel")
        const title = interaction.options.getString("title")
        const description = interaction.options.getString("description")
        const image = interaction.options.getString("image")
        const author = interaction.options.getString("author")
        const url = interaction.options.getString("url")
        const thumbnail = interaction.options.getString("thumbnail")
        const footer = interaction.options.getString("footer")
        const footerImage = interaction.options.getString("footer-image")

		if(channel && (channel.type !== guildid)) return interaction.reply({ content: "The channel must be a text channel.", ephemeral: true })

        try {
            const embeds = [{
                title: title,
                description: description ?? "** **",
                image: { url: image },
                color: Colors.Blurple,
                author: { name: author, url: url },
                thumbnail: { url: thumbnail },
                footer: { text: footer, iconURL: footerImage }
            }]
            interaction.reply({ content: "Done!", ephemeral: true })
            if(channel) {
                channel.send({
                    embeds: embeds
                })
            } else {
                interaction.channel.send({
                    embeds: embeds
                })
            }
        } catch(e) {
            interaction.reply("An error has occurred while sending the embed.")
        }
	},
};