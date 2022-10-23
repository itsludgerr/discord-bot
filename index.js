const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const {loadCommands} = require('./Handlers/commandHandler');
const {loadEvents} = require('./Handlers/eventHandler');


const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages] });

client.login(token).then(() => {

    loadEvents(client);
    loadCommands(client);

});

module.exports = {client};