const { client } = require('D://Important//Code//ExampleBot//index');

module.exports = {
	name: 'ready',
	once: true,
	async execute() {
		console.log(`${client.user.username} is now online.`);
		client.user.setActivity({ type: "WATCHING", name: `you.` });
	},
};