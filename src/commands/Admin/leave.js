const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
     name: 'leave',
     //description: '',
     /** 
      * @param {Client} client 
      * @param {Message} message 
      * @param {String[]} args 
      */

      run: async(client, message, args) => {
          if(!message.author.id === client.ownerId) return message.reply('Its an owner only command (Only my owner can use me!)');
          client.emit('guildMemberRemove', message.member) // you can also use this for any necesary events!
      }
}