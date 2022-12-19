const Discord = require('discord.js');

const db = require('quick.db');
const ms = import('parse-ms');

const cdTable = new db.table(`CmdCooldowns`)

/*
setCooldown(() => {

	let timeout = 3000 // 3 segundos em milisegundos.
	let cooldown = cdTable.fetch(`cooldown_${message.guild.id}_${message.author.id}`);
	if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
		let time = ms(timeout - (Date.now() - cooldown));
		if (time.seconds == "0") return message.reply(`<a:np_negado_bot:850033458763923456> **|** ${message.author}, você deve esperar **alguns milissegundos** para executar outro comando!`, {failIfNotExists: false});
		message.reply(`<a:np_negado_bot:850033458763923456> **|** ${message.author}, você deve esperar **${time.seconds} segundos** para executar outro comando!`, {failIfNotExists: false});
		return;
	}
	cdTable.set(`cooldown_${message.guild.id}_${message.author.id}`, Date.now())

});
*/

/*
let setCooldown = function(client,message,timeout) {

	timeout = 1000 * timeout // timeout em segundos multiplicado por 1000 milisegundos (1 segundo)
	let cooldown = cdTable.fetch(`cooldown_${message.guild.id}_${message.author.id}`);
	if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
		let time = ms(timeout - (Date.now() - cooldown));
		if (time.seconds == "0") return message.reply(`<a:np_negado_bot:850033458763923456> **|** ${message.author}, você deve esperar **alguns milissegundos** para executar outro comando!`, {failIfNotExists: false});
		message.reply(`<a:np_negado_bot:850033458763923456> **|** ${message.author}, você deve esperar **${time.seconds} segundos** para executar outro comando!`, {failIfNotExists: false});
		return;
	}
	cdTable.set(`cooldown_${message.guild.id}_${message.author.id}`, Date.now())

}
*/

class botCooldown {
	set(client,message,timeout) {

		timeout = 1000 * timeout // timeout em segundos multiplicado por 1000 milisegundos (1 segundo)
		let cooldown = cdTable.fetch(`cooldown_${message.guild.id}_${message.author.id}`);
		if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
			let time = ms(timeout - (Date.now() - cooldown));
			if (time.seconds == "0") {
				message.reply(`<a:np_negado_bot:850033458763923456> **|** ${message.author}, você deve esperar **alguns milissegundos** para executar outro comando!`, {failIfNotExists: false});
				return("stop")
			}
			message.reply(`<a:np_negado_bot:850033458763923456> **|** ${message.author}, você deve esperar **${time.seconds} segundos** para executar outro comando!`, {failIfNotExists: false});
			return("stop")
		}
		cdTable.set(`cooldown_${message.guild.id}_${message.author.id}`, Date.now())

	}
}

module.exports = { botCooldown }