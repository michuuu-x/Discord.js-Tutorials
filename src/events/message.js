const client = require('../../src/index')
const prefix = client.prefix;
const logs = require('../models/logs');

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.guild) return;

    

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


    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if(command.ownerOnly) {
            if(!message.author.id === '591950387112574988') return message.reply('Only my owner can use me!')
            command.run(client, message, args)
        } else {
             command.run(client, message, args)
        }
       
    }
});