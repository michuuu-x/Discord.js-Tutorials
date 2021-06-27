const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const db = require("../../models/logs");

module.exports = {
    name: 'logs',
    ownerOnly: true,
    description: 'Log actions to one particular channel!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('You do not have perms!');
        const options = [
            "set",
            "disable",
        ]

        const not = new MessageEmbed()
            .setTitle('Error')
            .addField("Missing argument!\n", "```logs set <channel>\nlogs disable\nex: logs set #logs-channel```")
            .setColor("RED")
            .setFooter('Err.. Boop Beep');

        if (!args.length) return message.channel.send(not);

        const opt = args[0].toLowerCase();

        if (!options.includes(opt)) return message.reply('That is not a valid option!')

        if (opt === 'set') {
            const channel = message.mentions.channels.first();

            db.findOne({
                guild: message.guild.id
            }, async (err, data) => {
                if (!data) {
                    data = new db({
                        guild: message.guild.id,
                        channel: channel.id
                    }).save()

                    return message.reply(`The logs channel has been set to <#${channel.id}> !!`)
                    
                } else {
                    db.findOneAndDelete({
                        guild: message.guild.id
                    }, data);

                    data = new db({
                        guild: message.guild.id,
                        channel: channel.id
                    }).save()
                    return message.reply(`The logs channel has been updated to <#${channel.id}> !!`)
                }
            })
        } else {
            db.findOneAndDelete({ guild: message.guild.id })
            return message.reply('Logs channel has been removed!')
        }
    }
}