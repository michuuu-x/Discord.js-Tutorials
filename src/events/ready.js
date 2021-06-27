const client = require('../../src/index');

client.on('ready', async () => {
    console.log(`${client.user.tag} is now online!`);

    client.generateInvite({
            permissions: ['ADMINISTRATOR', 'SEND_MESSAGES', 'MANAGE_GUILD', 'MENTION_EVERYONE'],
        })
        .then(link => console.log(`Generated bot invite link: ${link}`))
        .catch(console.error);
});