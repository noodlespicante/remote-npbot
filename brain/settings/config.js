'use strict';

var nome_org;
var inicio_org;
var ano_atual;
var website;
var copyright;

module.exports = {

    // IDs
    clientId: "1041008092395081819",
    npServerId: "584926863437070336",
    npBotId: "799661334995402772",

    // Logs
    mainLogId: "00000",
    economiaLog: "00000",

    // Infos
    nome_org: nome_org = "Noodles Picante",
    inicio_org: inicio_org = "2018",
    ano_atual: ano_atual = "2022",
    website: website = "www.noodlespicante.site",

    copyright: copyright = `© ${nome_org} ${inicio_org}-${ano_atual}`,
    footer: `${copyright} | ${website}`,

    // Outras configs
    minMembros: 30,
    bypassMinMembros: [ // Servidores que têm permissão para ter o bot sem ter o mínimo de membros
        "786311572862533632" // Projetos NP
    ],

    prefixos: ["npr!", "npr.", "npr-", "npr/"],

};