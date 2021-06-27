const {
    MessageEmbed
} = require('discord.js');

const db = require('../../models/levels.js'); // the schema!

require('discord-reply'); //the reply package!

module.exports = {
    name: 'level',
    ownerOnly: true,
    description: 'Leveling system!',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        //first lets get their choice so..

        if (!args.length) {

            //making the message with the correct options

            let embed = new MessageEmbed()
                .setTitle("Invalid Syntax!")
                .setDescription("Please use one of the following options!!\n```y!level on\ny!level off\ny!level set <#channel>```") // the prefix of my bot is y! so i did like this, you can make your own way!
                .setColor('RED')

            return message.channel.send({
                embed: embed
            })

        } else {
            let arg = args[0];
            const choices = ["on", "off"]; // i dont really think we need the set option.. since this tutorial is base on oning and offing

            if (!choices.includes(arg)) return message.lineReply('Invalid option!');

            //now we make a switch, for the choices they choose

            switch (arg) { // this switch doesn't require a default.. since we already made a check 
                case ('on'):
                    {

                        await db.findOne({
                            guild: message.guild.id
                        }, async (err, data) => {
                            if (!data) {
                                data = new db({
                                    guild: message.guild.id,
                                    choice: true
                                }).save();

                                return message.channel.send('The level system has been oned!');
                            } else {
                                if (data.choice !== false) return message.lineReply('The system was already on!');

                                data.choice = true;

                                await db.findOneAndUpdate({
                                    guild: message.guild.id
                                }, data);

                                return message.channel.send('The level system has been oned!');

                            }
                        })
                        break;
                    }
                case ('off'):
                    {
                        await db.findOne({
                            guild: message.guild.id
                        }, async (err, data) => {
                            if (!data) {

                                return message.channel.send('The level system was never oned!!');
                            } else {
                                if (data.choice !== true) return message.lineReply('The level system was never oned!!');

                                data.choice = false;

                                await db.findOneAndUpdate({
                                    guild: message.guild.id
                                }, data);

                                return message.channel.send('The level system has been offed!');

                            }
                        })
                        break;
                    }
            }
        }
    }
}