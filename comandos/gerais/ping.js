const { ActionRowBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder} = require('discord.js');
const prettyMilliseconds = require("pretty-ms");

module.exports = {

// Message command
	run: async (props) => {
		const {client, message, args, brain, prefixos, msgPrefixo, commandName} = props;

		if (args[0] == 'mention-test') {
			message.channel.send(`Teste de **everyone**: @everyone <@&786311572862533632>`);
			message.channel.send('Teste de **here**: @here');
			return;
		}

		let userPing = new Date().getTime() - message.createdTimestamp;
		userPing = Math.abs(userPing);
		//message.channel.send(`Teste`);

		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setURL('https://www.noodlespicante.site/api/status')
				.setLabel('Verificar status da API')
				.setStyle('Link'),
		);

		let embed = new EmbedBuilder()
		.setTitle("Pings de API")
		.setColor("00aeff")
		//.setDescription(`O ping do bot é de \`${Math.round(client.ping)}ms\` \nEstou online tem \`${prettyMilliseconds(client.uptime)}\``)
		.setDescription(`\\👤 Seu ping é de \`${userPing}ms\` \n\\🏓 Meu ping é de \`${Math.round(client.ws.ping)}ms\` \n\\⏰ Estou online há \`${prettyMilliseconds(client.uptime)}\``)
		//.setFooter(`Comando de ping | Noodles Picante`, client.user.displayAvatarURL);
		//.setFooter({ text: 'Comando de ping | Noodles Picante', iconURL: client.user.displayAvatarURL });
		.setFooter({ text: brain.config.footer, iconURL: client.user.displayAvatarURL() });

		console.log(brain.config.ano_atual)
		message.reply({ embeds: [embed], components: [row]});

	},

	help: {
		name: "ping",
	},

// Slash command
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Verifique se o bot está funcionando')
		.setDMPermission(false),
		async execute(client, interaction, wait, brain, prefix, commandName) {
		await interaction.deferReply();

		let userPing = new Date().getTime() - interaction.createdTimestamp
		userPing = Math.abs(userPing);

		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setURL('https://www.noodlespicante.site/api/status')
				.setLabel('Verificar status da API')
				.setStyle('Link'),
		);

		let embed = new EmbedBuilder()
		.setTitle("Pings de API")
		.setColor("00aeff")
		//.setDescription(`O ping do bot é de \`${Math.round(client.ping)}ms\` \nEstou online tem \`${prettyMilliseconds(client.uptime)}\``)
		.setDescription(`\\👤 Seu ping é de \`${userPing}ms\` \n\\🏓 Meu ping é de \`${Math.round(client.ws.ping)}ms\` \n\\⏰ Estou online há \`${prettyMilliseconds(client.uptime)}\``)
		//.setFooter(`Comando de ping | Noodles Picante`, client.user.displayAvatarURL);
		//.setFooter({ text: 'Comando de ping | Noodles Picante', iconURL: client.user.displayAvatarURL });
		.setFooter({ text: brain.config.footer, iconURL: client.user.displayAvatarURL() });

		await interaction.editReply({ embeds: [embed], components: [row] });
	}
}