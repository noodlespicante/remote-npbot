'use strict';

module.exports = {
  // Configs
  config: require(`./settings/config`),
  cmdSettings: require(`./settings/cmdSettings.json`),

  // Variables
  emojis: require(`./variables/emojis.json`),
  channels: require(`./variables/channels.json`),
  roles: require(`./variables/roles.json`),

  // Engines
  botCooldown: require(`./engines/command-cooldown`),
  botPermission: require(`./engines/command-permission`),
}