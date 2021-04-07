const { Collection, Client, Discord } = require('discord.js');
const client = new Client({
    disableEveryone: true
})
const path = require('path')
const fs = require('fs')
const config = require('./config.json');
module.exports = client;
client.commands = new Collection();
client.ownerId = config.ownerID
client.prefix = config.prefix;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('src/commands'));
["command"].forEach(handler => {
    require(path.resolve(`src/handlers/${handler}`))(client);
}); 
const mongoID = config.mongoID // mongoID (just put it in the config.json file!) or just type it there

const mongo = require('mongoose'); // requiring the package

mongo.connect(mongoID, { // can also type the url here itself!
    useNewUrlParser: true,
    useUnifiedTopology: true
})

client.login(config.token);