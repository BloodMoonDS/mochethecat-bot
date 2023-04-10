// required to do the file thing
const fs = require('node:fs');
const path = require('node:path');
// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID;
const TOKEN = process.env.TOKEN;
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set';
const GUILD_ID = process.env.GUILD_ID;

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
  const reg = require("/modules/register.js");
  reg.trigger()
})


app.listen(8999, () => {

})

client.login(TOKEN);