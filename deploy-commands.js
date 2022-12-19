const fs = require('node:fs');
const { REST } = require('@discordjs/rest');

const versaoAPI = '10';
const { Routes } = require(`discord-api-types/v${versaoAPI}`);

const brain = require(`./brain/brain`);

const dotenv = require('dotenv');
dotenv.config();

let clientId = brain.config.clientId;
//let guildId = brain.config.guildId;

var commands = [];
//var commandsG = [];
var commandNumb = 0;

const commandsFolders = fs.readdirSync('./comandos');

commandsFolders.forEach(async folder => {

	const arquivojs = fs.readdirSync(`./comandos/${folder}`).filter(file => file.endsWith('.js'));
	//const arquivojsG = fs.readdirSync(`./comandos/${folder}`).filter(file => file.endsWith('.js'));

	for (let f of arquivojs) {
		const props = require(`./comandos/${folder}/${f}`);
		if (props.desabilitado == "sim") continue; //Verifica se o comando como um todo está desabilitado
		if (props.noint == "sim") continue; //Verifica se o int está desabilitado
		if (!props.data) continue; //Verifica se existe a propriedade data
		if (!props.execute) continue; //Verifica se existe a propriedade execute

		commands.push(props.data.toJSON());
		commandNumb++;
		console.log(`> Interação ${f} registrada com sucesso!`);
	}

/*
	for (let fG of arquivojsG) {
		const props = require(`./comandos/${folder}/${fG}`);
		if (props.desabilitado == "sim") continue; //Verifica se o comando como um todo está desabilitado
		if (props.noint == "sim") continue; //Verifica se o int está desabilitado
		if (!props.data) continue; //Verifica se existe a propriedade data
		if (!props.execute) continue; //Verifica se existe a propriedade execute

		commandsG.push(props.data.toJSON());
		console.log(`[!] Interação global ${fG} registrada com sucesso!`)
	}
*/

});

const rest = new REST({ version: versaoAPI }).setToken(process.env.DC_TOKEN);

/*
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(async() => await console.log('Todas as interações foram registradas com sucesso!')).then(async() => await console.log(`==========================`)).then(async() => await console.log(` `))
	.catch(console.error);

rest.put(Routes.applicationCommands(clientId), { body: commandsG })
	.then(async() => await console.log('Todas as interações globais foram registradas com sucesso!')).then(async() => await console.log(`==========================`)).then(async() => await console.log(` `))
	.catch(console.error);
*/

if (commandNumb > 0) {
    rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(console.log(` `))
    .then(console.log('[!] Todas as interações globais foram registradas com sucesso!'))
    .then(console.log(` `))
    .catch(console.error);
} else {
    console.log(`[!] Nenhuma interação global registrada!`);
    console.log(` `);
}