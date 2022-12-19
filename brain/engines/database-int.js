const Discord = require('discord.js');

const db = require('quick.db')
const ms = require('parse-ms')

const dotenv = require('dotenv');
dotenv.config();

const pgEnv = process.env.postgres;

const postgres = require('postgres');
const sql = postgres({
	host: pgEnv.host, // IP ou nome de domínio do Postgres
	port: pgEnv.port, // Porta do servidor Postgres
	database: pgEnv.database, // Nome da database
	username: pgEnv.username, // Username do usuário da database
	password: pgEnv.password, // Senha do usuário da database
});

class npcoins {
	async set(interaction, id, quant) {

		let coins = {money: quant};

		let membro = await sql`
          select
            id
          from public.membro
          where
            id = ${id}
		`

		if (!membro) {
		  //interaction.followUp({content: `${interaction.user}, o membro indicado não foi encontrado!`});
		  return "stop";
		};

		await sql`
          update public.membro set ${
            sql(coins, 'money')
          }
          where id = ${membro[0].id}
		`

	};
	async get(interaction, id) {

		let membro = await sql`
          select
            *
          from public.membro
          where
            id = ${id}
		`

		if (!membro) {
		  //interaction.followUp({content: `${interaction.user}, o membro indicado não foi encontrado!`});
		  return "stop";
		};

		let money = membro[0]?.money;
		return await(money);

	};
};

module.exports = { npcoins }