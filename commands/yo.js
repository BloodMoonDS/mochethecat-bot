const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yo')
		.setDescription('Replies with yo!'),
	async execute(interaction) {
		await interaction.reply(`Yo ${interaction.member.user.username}!`);
	},
};