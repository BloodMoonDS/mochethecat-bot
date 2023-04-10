const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('???'),
	async execute(interaction) {
		await interaction.reply('Meow');
	},
};