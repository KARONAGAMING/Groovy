const Discord = require("discord.js")
const config = require("./config.json")
module.exports.formatDate = formatDate;
module.exports.promptMessage = promptMessage;
module.exports.embedbuilder = embedbuilder;
module.exports.errorbuilder = errorbuilder;
module.exports.customplaylistembed = customplaylistembed;
module.exports.lyricsEmbed = lyricsEmbed;
module.exports.playsongyes = playsongyes;
module.exports.curembed = curembed;
module.exports.delay = delay;
module.exports.getRandomInt = getRandomInt;
module.exports.QueueEmbed = QueueEmbed;
module.exports.check_if_dj = check_if_dj;

function check_if_dj(message, member) {
    //if no message added return
    if(!message) return false;
    //set variable for "client"
    var client = message.client;

    if (!member) member = message.member;
    //get the adminroles
    var roleid = client.settings.get(message.guild.id, `djroles`)
    //if no dj roles return false, so that it continues
    if (String(roleid) == "") return false;

    //define variables
    var isdj = false,
        string = "";

    //loop through the roles
    for (let i = 0; i < roleid.length; i++) {
        //if the role does not exist, then skip this current loop run
        if (!message.guild.roles.cache.get(roleid[i])) continue;
        //if he has role set var to true
        if (member.roles.cache.has(roleid[i])) isdj = true;
        //add the role to the string
        string += "<@&" + roleid[i] + "> | "
    }
    //if no dj and not an admin, return the string
    if (!isdj && !member.hasPermission("ADMINISTRATOR"))
        return string;
    //if he is a dj or admin, then return false, which will continue the cmd
    else
        return false;
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US').format(date)
}
async function promptMessage(message, author, time, validReactions) {
    time *= 1000;
    for (const reaction of validReactions) await message.react(reaction);
    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
    return message
        .awaitReactions(filter, {
            max: 1,
            time: time
        })
        .then(collected => collected.first() && collected.first().emoji.name);
}

function embedbuilder(client, deletetime, message, color, title, description, thumbnail) {
    try {
        if (title.includes("filter") && title.includes("Adding")) {
            client.infos.set("global", Number(client.infos.get("global", "filters")) + 1, "filters");
        }
    } catch {}
    try {
        let embed = new Discord.MessageEmbed()
        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (thumbnail) embed.setThumbnail(thumbnail)
        if (!deletetime || deletetime === undefined || deletetime === "null") {
            message.channel.send(embed)
                .then(msg => {
                    try {
                        if (msg.channel.type === "news")
                            msg.crosspost()
                    } catch (error) {
                        console.log(error)
                        errorbuilder(error.stack.toString().substr(0, 2000))
                    }
                })
            return;
        }
        return message.channel.send(embed).then(msg => msg.delete({
            timeout: deletetime
        }));
    } catch (error) {
        embedbuilder(client, 5000, message, "RED", "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
        errorbuilder(error.stack.toString().substr(0, 2000))
    }
}

function errorbuilder(error) {
    console.log(error)
}

function QueueEmbed(client, queue) {
    try {
        let embeds = [];
        let k = 10;
        //defining each Pages
        for (let i = 0; i < queue.songs.length; i += 10) {
            let qus = queue.songs;
            const current = qus.slice(i, k)
            let j = i;
            k += 10;
            const info = current.map((track) => `**${j++} -** [\`${track.name}\`](${track.url}) - \`${track.formattedDuration}\``).join("\n")
            const embed = new Discord.MessageEmbed()
                .setTitle("Server Queue")
                .setColor(config.colors.yes)
                .setDescription(`**Current Song - [\`${qus[0].name}\`](${qus[0].url})**\n\n${info}`)
                .setFooter(client.user.username + " | by: BROKARONAGAMING#2962", client.user.displayAvatarURL())
            embeds.push(embed);
        }
        //returning the Embed
        return embeds;
    } catch (error) {
        console.log(error)
        errorbuilder(error.stack.toString().substr(0, 2000))
    }
}

function customplaylistembed(client, message, lyrics, song) {
    if (!lyrics) lyrics = "No Songs in the playlist!";
    try {
        let embeds = [];
        let k = 1000;
        for (let i = 0; i < lyrics.length; i += 1000) {
            const current = lyrics.slice(i, k);
            k += 1000;
            const embed = new Discord.MessageEmbed()
                .setTitle("Custom Playlist")
                .setColor(config.colors.yes)
                .setDescription(current)
            embeds.push(embed);
        }
        return embeds;
    } catch (error) {
        console.log(error)
        embedbuilder(client, 5000, message, "RED", "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
        errorbuilder(error.stack.toString().substr(0, 2000))
    }
}

function lyricsEmbed(client, message, lyrics, song) {
    try {
        let embeds = [];
        let k = 1000;
        for (let i = 0; i < lyrics.length; i += 1000) {
            const current = lyrics.slice(i, k);
            k += 1000;
            const embed = new Discord.MessageEmbed()
                .setTitle("Lyrics - " + song.name)
                .setDescription(current)
            embeds.push(embed);
        }
        return embeds;
    } catch (error) {
        console.log(error)
        embedbuilder(client, 5000, message, "RED", "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
        errorbuilder(error.stack.toString().substr(0, 2000))
    }
}
async function playsongyes(client, message, queue, song) {
    try {
        let djs = "";
        if (client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "not setup"
        else
            for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
                djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
            }

        let embed1 = new Discord.MessageEmbed()

            .setTitle("Now Playing")
            .setDescription(`[${song.name}](${song.url}) [${song.user}]`)

        var playingMessage = await message.channel.send(embed1)

        client.settings.set(message.guild.id, playingMessage.id, "playingembed")
        client.settings.set(message.guild.id, message.channel.id, "playingchannel")


    } catch (error) {
        console.log(error)
        embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
        errorbuilder(error.stack.toString().substr(0, 2000))
    }
}

function curembed(client, message) {
    try {
        let djs = "";
        if (client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "not setup"
        else
            for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
                djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
            }

        let queue = client.distube.getQueue(message); //get the current queue
        let song = queue.songs[0];
        embed = new Discord.MessageEmbed()
            .setTitle("Playing Song:")
            .setDescription(`> [\`${song.name}\`](${song.url})`)
        return embed; //sending the new embed back
    } catch (error) {
        console.log(error)
        embedbuilder(5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
        errorbuilder(error.stack.toString().substr(0, 2000))
    }
}

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}