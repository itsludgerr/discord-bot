const { SlashCommandBuilder, EmbedBuilder, Colors, PermissionFlagsBits} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear a specific amount of messages from a target or channel.")
        .addIntegerOption(option =>
            option.setName('amount')
            .setDescription('Amount of messages to clear.')
            .setRequired(true)
            )
        .addUserOption(option =>
            option.setName('target')
            .setDescription('Select a target to clear their messages.')
            .setRequired(false)
            )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        async execute(interaction) {
            const {channel, options} = interaction;
    
            const amount = options.getInteger('amount');
            const target = options.getUser("target");
    
            const messages = await channel.messages.fetch({
                limit: amount +1,
            });
    
            const res = new EmbedBuilder()
                .setColor(Colors.Blurple)
    
            if(target) {
                let i = 0;
                const filtered = [];
    
                (await messages).filter((msg) =>{
                    if(msg.author.id === target.id && amount > i) {
                        filtered.push(msg);
                        i++;
                    }
                });
    
                await channel.bulkDelete(filtered).then(messages => {
                    res.setDescription(`Succesfully deleted ${messages.size} messages from ${target}.`);
                    interaction.reply({embeds: [res], ephemeral: true}); // you can use ephemeral if you desire
                });
            } else {
                await channel.bulkDelete(amount, true).then(messages => {
                    res.setDescription(`Succesfully deleted ${messages.size} messages from the channel.`);
                    interaction.reply({embeds: [res], ephemeral: true});
                });
            }
        }
    }