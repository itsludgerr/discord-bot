function loadEvents(client) {
    const fs = require('fs');

    const eventFiles = fs.readdirSync("D://Important//Code//ExampleBot//events").filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`D://Important//Code//ExampleBot//events/${file}`);
        if (event.rest) {
            if(event.once)
                client.rest.once(event.name, (...args) =>
                event.execute(...args, client)
            );
            else
                client.rest.on(event.name, (...args) =>
                    event.execute(...args, client)
                );
        } else {
            if (event.once)
                client.once(event.name, (...args) => event.execute(...args, client));
            else client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
    return console.log("Loaded events");
}

module.exports = {loadEvents};