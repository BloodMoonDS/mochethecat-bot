const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, CommandInteraction, Client, Events , ChannelType} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('revive')
		.setDescription('Server will revive')
		.addIntegerOption(option =>{
			return option.setName('times')
				.setDescription('Times to spam')
				.setRequired(true)
		})
		.addChannelOption(option => {
			return option
				.setName('channel')
				.setDescription('channel where its gonna send it')
				.setRequired(true)
				
		}),
	async execute(interaction) {
		//const times = interaction.options.getInt('times');
		times = 64
		const channel = interaction.options.getString('channel');
		await interaction.reply('@everyone @here Revivan chat');
		channel.send('@everyone @here Revivan chat');
		channel.send('@everyone @here Revivan chat');
		channel.send('@everyone @here Revivan chat');
		channel.send('@everyone @here Revivan chat');
		channel.send('@everyone @here Revivan chat');
		channel.send('@everyone @here Revivan chat');
		channel.send('@everyone @here Revivan chat');
		channel.send('@everyone @here Revivan chat');
		channel.send('@everyone @here Revivan chat');
		while(times < times + 1){
			channel.send('@everyone @here Revivan chat');
			
		}
	},
};