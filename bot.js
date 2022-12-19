const { Client, Collection, Events, GatewayIntentBits, Message, Partials } = require('discord.js');
const dotenv = require('dotenv');

const fs = require('node:fs');
const path = require('node:path');

dotenv.config();
const token = process.env.DC_TOKEN;

const brain = require('./brain/brain'); // Bora carregar o cérebro do bot

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, //Privilegiada
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences, //Privilegiada
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent, //Privilegiada
    ],
    partials: [Partials.Channel],
    shards: 'auto',
});

const discordModals = require('discord-modals');
discordModals(client);

client.commands = new Collection();
client.aliases = new Collection();

client.once(Events.ClientReady, async (client) => {
    console.log(` `);
    console.log(`Ok, estou online e logado como ${client.user.tag} (${client.guilds.cache.size} servidor(es) na shard)`);

    await client.shard.fetchClientValues('guilds.cache.size').then(async results => {
        let totalServidores = results.reduce((acc, guildCount) => acc + guildCount, 0)
        console.log(`${totalServidores} servidor(es) no total`);
        console.log(` `);
    }).catch(console.error);

    //client.user.setAFK(true, 0);
});

console.log(` `);

var commandNumb = 0;
const commandsFolders = fs.readdirSync('./comandos');

// Separar comandos em pastas com categorias:
// https://github.com/discordjs/guide/blob/v12/code-samples/command-handling/adding-features/12/index.js

commandsFolders.forEach(async folder => {
    const arquivojs_cmd = fs.readdirSync(`./comandos/${folder}`).filter(file => file.endsWith('.js'));

    for (const f of arquivojs_cmd) {
        const props = require(`./comandos/${folder}/${f}`);
        if (props.desabilitado == "sim") continue; // Verifica se o comando como um todo está desabilitado
        if (!props.help) continue; // Verifica se existe a propriedade help
        if (!props.run) continue; // Verifica se existe a propriedade run

        client.commands.set(props.help.name, props);
        client.aliases.set(props.help.aliases, props);

        console.log(`> Comando ${f} e seus aliases carregado com sucesso!`);
        commandNumb++;
    }

});

if (commandNumb > 0) {
    console.log(` `);
    console.log(`[!] Todos os comandos foram registrados com sucesso!`);
} else {
    console.log(`[!] Nenhum comando registrado!`);
}
console.log(` `);

// Enviar slash commands para a API do Discord
const deployCmds = require(`./deploy-commands`);

client.on(Events.GuildCreate, async (guild) => {

    if (brain.config.bypassMinMembros.includes(guild.id)) return;

    // Esperar 15 segundos e verificar se o servidor tem menos de X membros, e se tiver, sair do servidor como forma de proteger o bot contra ataques
    let minMembros = brain.config.minMembros;
    let quantMembros = guild.members.cache.size();
    if (quantMembros < minMembros) {
        setTimeout(async () => {
            let dono = await guild.fetchOwner();
            await dono.send(`Olá! O servidor **${guild.name} (ID: \`${guild.id}\`)** tem **${quantMembros}**, mas para adicionar o bot remoto da Noodles Picante é necessário ter, no mínimo, **${minMembros}** membros. \nQuando o servidor tiver alcançado essa quantia, tente adicionar o bot novamente!`);
            await guild.leave(`Servidor com menos de ${minMembros}`);
            return;
        }, 15000);
    }

});

// Quando uma mensagem for enviada (ou um comando normal for usado):
client.on(Events.MessageCreate, async (message) => {

    if (message.content == "test") return message.reply(`Opa, testado e funcionando!`);

    let prefixos = brain.config.prefixos;

	let messageArray = message.content.split(" ");
	let command = messageArray[0].toLowerCase();
	let args = messageArray.slice(1);

    var msgPrefixo;

    prefixos.forEach(prefixo => {
        if (message.content.toLowerCase().startsWith(prefixo)) msgPrefixo = prefixo;
    });

    if (!msgPrefixo && !message.content.startsWith(`<@!?${brain.config.clientId}>`)) return; //mensagem enviada sem prefixo o bot ignora
    if (message.content.toLowerCase() == msgPrefixo || message.content == (`<@!?${brain.config.clientId}>`)) return message.reply(`${message.author}, eu sou o bot remoto da Noodles Picante! \nVeja meus comandos usando \`${msgPrefixo}ajuda\` ou os slash commands usando \`/ajuda\``);

    let arquivocmd = client.commands.get(command.slice(msgPrefixo.length)) || client.commands.find((cmd) => cmd.help.aliases?.includes(command.slice(msgPrefixo.length)));
    let commandName = arquivocmd?.help?.name;

    if (arquivocmd?.help?.nocmd == "sim") return message.reply(`${message.author}, este comando de mensagem não existe, porém pode estar disponível por slash commands! \nExecute **\`${msgPrefixo}ajuda\`** ou **\`/ajuda\`** para visualizar a lista de comandos ou slash commands existentes.`, {failIfNotExists: false});

    // Sistema de cooldown - INÍCIO
    const {botCooldown} = require(`./brain/engines/command-cooldown`);
    const cooldownTime = brain.cmdSettings[commandName]?.cooldown;
    if (cooldownTime) {
        let cooldownResp = await new botCooldown().set(client,message,cooldownTime);
        if (cooldownResp == "stop") return;
    };
    // Sistema de cooldown - FINAL

    // Sistema de permissões - INÍCIO
    const {botPermission} = require(`./brain/engines/command-permission`);
    const permissionRoles = brain.cmdSettings[commandName]?.perms;
    if (permissionRoles) {
        let permissionResp = await new botPermission().set(client,message,permissionRoles);
        if (permissionResp == "stop") return;
    };
    // Sistema de permissões - FINAL

    if (!arquivocmd) return message.reply(`${message.author}, houve um erro ao executar este comando ou ele não existe! \nExecute **\`${msgPrefixo}ajuda\`** ou **\`/ajuda\`** para visualizar a lista de comandos ou slash commands existentes.`, {failIfNotExists: false});

    let props = {
        client,
        message,
        args,
        brain,
        prefixos,
        msgPrefixo,
        commandName
    };

    //arquivocmd.run(client, message, args, brain, prefixos, msgPrefixo, commandName) // Executa o comando
    arquivocmd.run(props) // Executa o comando

});



client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const arquivoCmd_Interaction = client.commands.get(interaction.commandName) || client.commands.find((cmd) => cmd.help?.aliases?.includes(interaction.commandName));
    if (!arquivoCmd_Interaction) return interaction.reply(`este comando não existe realmente ou está indisponível! \nExecute **\`/ajuda\`** para visualizar a lista de slash commands existentes.`);

	const wait = require('util').promisify(setTimeout);
	let prefixos = brain.config.prefixos;
	let { commandName } = interaction;

	try {
		await arquivoCmd_Interaction.execute(client, interaction, wait, brain, prefixos, commandName); // Executa o slash command
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Houve um erro ao tentar executar esse comando!', ephemeral: true });
	};

});

client.login(token);