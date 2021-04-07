const client = require('../index.js'); 
const db = require('../models/logs'); // getting the db!
const { MessageEmbed } = require('discord.js'); 

client.on('guildMemberAdd', async(member) => { // when a member joins the server!
    db.findOne({ guild: member.guild.id }, async(err, data) => {
        if(!data) return;
        const ch = data.channel;
        const channel = member.guild.channels.cache.get(ch);

        const m = new MessageEmbed()
        .setTitle('New Log!')
        .setDescription(`New member joined!\nMember: ${member}`)  // you can ofcouse you a better embed, i made as an example!
        .setColor("GREEN")

        channel.send(m)
    })
})

client.on('guildMemberRemove', async(member) => { // when a member leaves the server
    db.findOne({ guild: member.guild.id }, async(err, data) => {
        if(!data) return;
        const ch = data.channel;
        const channel = member.guild.channels.cache.get(ch);

        const m = new MessageEmbed()
        .setTitle('New Log!')
        .setDescription(`A member left!\nMember: ${member}`)
        .setColor("GREEN")

        channel.send(m)
    })
})

client.on('roleCreate', async(role) => { // when a role is created!
    db.findOne({ guild: role.guild.id }, async(err, data) => {
        if(!data) return;
        const ch = data.channel;
        const channel = role.guild.channels.cache.get(ch);

        const m = new MessageEmbed()
        .setTitle('New Log!')
        .setDescription(`A new role has been created!\nRole: ${role}`)
        .setColor("GREEN")

        channel.send(m)
    })
})

client.on('roleDelete', async(role) => { // when a role is deleted!
    db.findOne({ guild: role.guild.id }, async(err, data) => {
        if(!data) return;
        const ch = data.channel;
        const channel = role.guild.channels.cache.get(ch);

        const m = new MessageEmbed()
        .setTitle('New Log!')
        .setDescription(`A role has been deleted!\nRole: ${role.name}`)
        .setColor("GREEN")

        channel.send(m)
    })
})

client.on('channelCreate', async(channel) => { // when a channel is created
    db.findOne({ guild: channel.guild.id }, async(err, data) => {
        if(!data) return;
        const ch = data.channel;
        const chann = channel.guild.channels.cache.get(ch);

        const m = new MessageEmbed()
        .setTitle('New Log!')
        .setDescription(`A new channel has been created!\nChannel: ${channel}`)
        .setColor("GREEN")

        chann.send(m)
    })
})

client.on('channelDelete', async(channel) => { // finally when the channel is deleted
    db.findOne({ guild: channel.guild.id }, async(err, data) => {
        if(!data) return;
        const ch = data.channel;
        const chann = channel.guild.channels.cache.get(ch);

        const m = new MessageEmbed()
        .setTitle('New Log!')
        .setDescription(`A channel has been deleted!\nChannel: ${channel.name}`)
        .setColor("GREEN")

        chann.send(m)
    })
})

