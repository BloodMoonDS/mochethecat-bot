const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('salute')
		.setDescription('Says Hi to an user')
		.addUserOption(option => {return option
			.setDescription("User to Salute")
			.setName("user")
			.setRequired(true)
		}),
	async execute(interaction) {


		await interaction.reply(`Hi!`);
	},
};