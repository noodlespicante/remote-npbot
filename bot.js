const { Client, Events, GatewayIntentBits, Message, Partials } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();
const token = process.env.DC_TOKEN;

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
});

client.once(Events.ClientReady, client => {
    console.log(`Ok, estou online e logado como ${client.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
    if (!message.channel) return;
    console.log(`Opa!`);

    console.log(message);
    if (message.content == "np~test") return message.reply(`Opa, testado e funcionando!`);

});

client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'stats') {
        return interaction.reply(`Estou atualmente em ${client.guilds.cache.size} servidores.`);
    }
});

client.login(token);