const { MessageEmbed, Message } = require("discord.js");
const { MessageButton } = require('discord-buttons')
const config = require("../../config.json");
const ee = require("../../embed.json");
const {
  duration
} = require("../../handlers/functions")

module.exports = {
    name: "help",
    category: "Information",
    aliases: ["Help", "H", "h"],
    cooldown: 4,
    usage: "help",
    description: "Shows all available Commands",
    run: async (client, message, args, user, text, prefix) => {
    try{
let invite = new MessageButton().setStyle('url').setLabel('Invite').setURL("https://discord.com/api/oauth2/authorize?client_id=869772881737961472&permissions=8&scope=bot")
let commands = new MessageButton().setStyle('url').setLabel('Commands').setURL(`https://groovy.bot/commands?prefix=-`)
let premium = new MessageButton().setStyle('url').setLabel('Premium').setURL(`https://groovy.bot/premium`)
let support = new MessageButton().setStyle('url').setLabel('Support').setURL(`https://groovy.bot/support`)
      //array of all buttons
const allbuttons = [invite, commands, premium, support]

message.channel.send({
        embed: new MessageEmbed()
.setAuthor("Groovy", client.user.displayAvatarURL())

.addField("** **", `Groovy is the easiest way to play music in your Discord server. It supports Spotify, YouTube, Soundcloud [and more!](https://groovy.zendesk.com/hc/en-us/articles/360021234491-Supported-Platforms)`)

.addField("** **", 'To get started, join a voice channel and -play a song. You can use song names, video links, and playlist links.')

.addField("** **", `** **`)

.addField("Commands",`A full list of commands is available [here](https://groovy.bot/commands?prefix=-)`)

.addField("** **", `** **`)

.addField("Premium",`**[Groovy Premium](https://groovy.bot/premium)** gives you access to cool features, like **volume control, 24/7 mode, audio effects**, and **saved queues**. [Click here to learn more.](https://groovy.bot/premium)`)

.addField("** **", `** **`)

.addField("Invite",`Groovy can be added to as many servers as you want! [Click here to add it to yours.](https://discord.com/api/oauth2/authorize?client_id=869772881737961472&permissions=8&scope=bot)`)

.addField("** **", `** **`)

.addField("Support",`[Click here](https://groovy.bot/support) to talk to our support team if you're having trouble or have any questions.`),

buttons: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}