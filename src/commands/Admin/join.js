const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
     name: 'join',
     //description: '',
     /** 
      * @param {Client} client 
      * @param {Message} message 
      * @param {String[]} args 
      */

      run: async(client, message, args) => {
          if(!message.author.id === client.ownerId) return message.reply('Its an owner only command (Only my owner can use me!)');
          client.emit('guildMemberAdd', message.member) // we are emiting the guildmemberadd event, as ourselves! (it would make us like emiting us rejoing the the server kinda!)
      }
}