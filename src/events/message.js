const client = require('../../src/index')
const prefix = client.prefix;
const logs = require('../models/logs');
const Levels = require('discord-xp');
const level = require('../models/levels'); // now we require the db, and then see if the level system is oned!

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.guild) return;


    //Level up!

    //I took this directly from the package website!!

    // if you want you can make this a function, so that if you are using this for other commands like rank or profile or something.. you can easily see if the guild has level system oned or offed!


    level.findOne({
        guild: message.guild.id
    }, async (err, data) => {
        if (!data) return;

        if (data.choice == true) {
            const randomXp = Math.floor(Math.random() * 15) + 1;
            const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp)

            if (hasLeveledUp) {
                const user = await Levels.fetch(message.author.id, message.guild.id);
                message.channel.send(`GG <@${message.author.id}> leveled up to ${user.level}:tada:! Keep it going!`)
            }
        } else {
            return;
        }
    });



    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (command.ownerOnly) {
            if (!message.author.id === '591950387112574988') return message.reply('Only my owner can use me!')
            command.run(client, message, args)
        } else {
            command.run(client, message, args)
        }

    }
});

/*logs.findOne({
    guild: message.guild.id 
}, async (err, data) => {
    if (!data) return;

    const {
        guild
    } = message;

    const channel = data.channel;
    const ch = guild.channels.cache.get(channel);

    const op = (await guild.fetchAuditLogs()).entries.map((e) => {
        return e;
    })
    ch.send(await op)
})*/