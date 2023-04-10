
// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID 
const TOKEN = process.env.TOKEN 
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID 

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const ErrorMessage = "Dammint I couldn't execute that one command! Details:"


const { REST, Routes,Discord, Client, MessageEmbed, Application, Message, RichPresenceAssets, Presence, CommandInteraction, Intents, IntentsBitField, Collection, Events,GatewayIntentBits, ClientPresence, ClientPresenceStatus} = require("discord.js");
const axios = require('axios')
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');
const client = new Client({ intents: [IntentsBitField.Flags.GuildModeration,IntentsBitField.Flags.GuildMessages ,IntentsBitField.Flags.MessageContent,IntentsBitField.Flags.GuildMessageTyping] })

const app = express();
// app.use(bodyParser.json());

app.get('/register_commands', async (req,res) =>{ // I replaced the deploy-commands.js with the register url
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }
  // Construct and prepare an instance of the REST module
  const rest = new REST({ version: '10' }).setToken(token);
  // and deploy your commands!
  (async () => {
    try {
      console.log(`Started refreshing ${commands.length} application (/) commands.`);

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );

      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();


  return res.send(`Successfully reloaded ${data.length} application (/) commands.`)
})

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
			await interaction.followUp({ content: `${ErrorMessage} ${error}`, ephemeral: true });
		} else {
			await interaction.reply({ content: `${ErrorMessage} ${error}`, ephemeral: true });
		}
	}
});


app.get('/', async (req,res) =>{
  return res.send('Follow documentation ')
})


app.listen(8999, () => {

})

client.login(TOKEN);