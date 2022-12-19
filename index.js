const { ShardingManager } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const manager = new ShardingManager('./bot.js', {
    execArgv: ['--trace-warnings','--no-warnings'],
	shardArgs: ['--ansi', '--color'],
    token: process.env.DC_TOKEN,
});

manager.on('shardCreate', async (shard) => {
    console.log(`Shard ${shard.id} lançada com sucesso!`);
});

manager.spawn();