'use strict';

module.exports = {

    // IDs
    clientId: "1041008092395081819",
    npServerId: "584926863437070336",
    npBotId: "799661334995402772",

    // Logs
    mainLogId: "00000",
    economiaLog: "00000",

    // Infos
    nome_org: "Noodles Picante",
    inicio_org: "2018",
    ano_atual: "2022",
    website: "www.noodlespicante.site",

    copyright: `© ${this.nome_org} ${this.inicio_org}-${this.ano_atual}`,
    footer: `${this.copyright} | ${this.website}`,

    // Outras configs
    minMembros: 30,
    bypassMinMembros: [ // Servidores que têm permissão para ter o bot sem ter o mínimo de membros
        "786311572862533632" // Projetos NP
    ],

    prefixos: ["npr!", "npr.", "npr-", "npr/"],

};