// required to do the file thing
const fs = require('node:fs');
const path = require('node:path');
// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID;
const TOKEN = process.env.TOKEN;
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set';
const GUILD_ID = process.env.GUILD_ID;
const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const ErrorMessage = "Dammint I couldn't execute that one command! Details:"

const { REST, Routes,Discord, Client, MessageEmbed, Application, Message, RichPresenceAssets, Presence, CommandInteraction, Intents, IntentsBitField, Collection, Events,GatewayIntentBits, ClientPresence, ClientPresenceStatus} = require("discord.js");
const axios = require('axios')
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');
const client = new Client({ intents: [IntentsBitField.Flags.GuildModeration,IntentsBitField.Flags.GuildMessages ,IntentsBitField.Flags.MessageContent,IntentsBitField.Flags.GuildMessageTyping] })

client.commands = new Collection();

const app = express();
// app.use(bodyParser.json());




for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: `Maldición no pude ejecutar ese comando por favor mandale esto a bloodiey: ${error}`, ephemeral: true });
		} else {
			await interaction.reply({ content: `Maldición no pude ejecutar ese comando por favor mandale esto a bloodiey: ${error}`, ephemeral: true });
		}
	}
});


client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
app.get('/', async (req,res) =>{
  return res.send('Follow documentation ')
})

app.listen(8999, () => {

})
app.get('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body;
  if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: `Maldición no pude ejecutar ese comando por favor mandale esto a bloodiey: ${error}`, ephemeral: true });
		} else {
			await interaction.reply({ content: `Maldición no pude ejecutar ese comando por favor mandale esto a bloodiey: ${error}`, ephemeral: true });
		}
	}
})
client.login(TOKEN);