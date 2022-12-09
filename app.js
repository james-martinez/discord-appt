const { Client, Events, GatewayIntentBits, messageLink } = require('discord.js');
const https = require('https');
const date = new Date();
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
        case "!":
            const url = "https://idco.dmdc.osd.mil/idco/locator/site/170805/appnt/"
                + date.getFullYear() + "-" + (date.getMonth() + 1);

            const request = https.request(url, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data = data + chunk.toString();
                });

                response.on('end', () => {
                    const body = JSON.parse(data);
                    console.log(body);
                    let _msgs = JSON.stringify(JSON.parse(data), null, 2);
                    msg.channel.send('```json\n' + _msgs + '\n```');
                });
            })

            request.on('error', (error) => {
                console.log('An error', error);
            });
            request.end()



    }
})
client.login(process.env.DISCORD_TOKEN);
