const { REST, Routes } = require('discord.js');
const APPLICATION_ID = process.env.APPLICATION_ID;
const TOKEN = process.env.TOKEN;
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set';
const GUILD_ID = process.env.GUILD_ID;
const fs = require('node:fs');
const path = require('node:path');
prefix = ">>>";
client.commands = new Collection();
const commands = [];

module.exports = {
// Grab all the command files from the commands directory you created earlier

async trigger(){
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const ErrorMessage = "Dammint I couldn't execute that one command! Details:"

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
}
};
