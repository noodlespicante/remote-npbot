const Discord = require('discord.js');

class botPermission {
	set(client,message,roles) {

		if (!message.member.roles.cache.some(r=>roles.includes(r.name))) {
			message.reply(`${message.author}, você não tem permissões para usar esse comando!`, {failIfNotExists: false});
			return("stop")
		}
		return;

	}
}

module.exports = { botPermission }