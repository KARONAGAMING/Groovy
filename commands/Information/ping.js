const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "ping",
    aliases: ["latency"],
    category: "INFORMATION COMMANDS",
    description: "Returns latency and API ping",
    useage: "ping",
    run: async (client, message, args) => {
        return message.reply(
            new Discord.MessageEmbed()
            .setAuthor(`🏓 PING`)
            .setColor(config.colors.yes)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setDescription(`:heartbeat: Heartbeat: ${client.ws.ping} ms\n:stopwatch: API: ${client.ws.ping} ms`)
        )
    }
}
