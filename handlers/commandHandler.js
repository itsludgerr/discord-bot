const { Collection } = require('discord.js');

function loadCommands(client) {
    const fs = require("fs");
    const commandFiles = fs.readdirSync("D://Important//Code//ExampleBot//commands").filter(file => file.endsWith('.js'));

    client.commands = new Collection();
    let commandsArray = [];

    for (const file of commandFiles) {
        const command = require(`D://Important//Code//ExampleBot//commands/${file}`);
        client.commands.set(command.data.name, command);

        commandsArray.push(command.data.toJSON());
    }

    client.application.commands.set(commandsArray);
    return console.log("Loaded Commands");
}

module.exports = { loadCommands };