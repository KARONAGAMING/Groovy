const { MessageEmbed, Message } = require("discord.js");
const { MessageButton } = require('discord-buttons')
const config = require("../../config.json")
module.exports = {
    name: "invite",
    aliases: ["add"],
    category: "Information",
    description: "Invite the Bot to your Server",
    useage: "invite",
    run: async (client, message, args) => {
  const button = new MessageButton()
  .setStyle('url')
  .setLabel('Invite')
  .setURL("https://discord.com/api/oauth2/authorize?client_id=869772881737961472&permissions=8&scope=bot")
  message.channel.send("** **", button)
  }
}