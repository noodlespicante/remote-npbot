'use strict';

module.exports = {
  // Configs
  config: require(`../brain/settings/config.js`),
  cmdSettings: require(`../brain/settings/cmdSettings.json`),

  // Variables
  emojis: require(`../brain/variables/emojis.json`),
  channels: require(`../brain/variables/channels.json`),
  roles: require(`../brain/variables/roles.json`),

  // Engines
  botCooldown: require(`./engines/command-cooldown`),
  botPermission: require(`./engines/command-permission`),
}