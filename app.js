const { Client, Events, GatewayIntentBits, messageLink } = require('discord.js');
const { on } = require('events');
const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
});
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})
client.on(Events.MessageCreate, msg => {
    if (msg.author.bot) return;
    switch (msg.content) {
        case "!appt":
            console.log(`Message from ${msg.author.username}: ${msg.content} , Channel: ${msg.channel.name}`);
            msg.channel.send("Here's your appt!");
    }
})
client.login(process.env.DISCORD_TOKEN);
