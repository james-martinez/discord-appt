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
        case "!l":
            const lurl = "https://idco.dmdc.osd.mil/idco/locator/site/101567/appnt/"
                + date.getFullYear() + "-" + (date.getMonth() + 1);

            const lrequest = https.request(lurl, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data = data + chunk.toString();
                });

                response.on('end', () => {
                    const body = JSON.parse(data);
                    const filt = body.filter(function (item) { return item.open != "0"; });
                    const jsmsg = JSON.stringify(filt, null, 2)
                    console.log('!l\n' + jsmsg);
                    msg.channel.send('Lackland https://goo.gl/maps/4U2u8R76DdoNY69i6\n Open appointments for ' + (date.getMonth() + 1) + '-' + date.getFullYear() + '\n' + '```json\n' + jsmsg + '\n``` Make an appointment https://idco.dmdc.osd.mil/idco/locator');

                });
            })

            lrequest.on('error', (error) => {
                console.log('An error', error);
            });
            lrequest.end()
            break;

        case "!r":
            const rurl = "https://idco.dmdc.osd.mil/idco/locator/site/101622/appnt/"
                + date.getFullYear() + "-" + (date.getMonth() + 1);

            const rrequest = https.request(rurl, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data = data + chunk.toString();
                });

                response.on('end', () => {
                    const body = JSON.parse(data);
                    const filt = body.filter(function (item) { return item.open != "0"; });
                    const jsmsg = JSON.stringify(filt, null, 2)
                    console.log('!r\n' + jsmsg);
                    msg.channel.send('Randolph https://goo.gl/maps/qiyBAXRoibnwJoRf8\n Open appointments for ' + (date.getMonth() + 1) + '-' + date.getFullYear() + '\n' + '```json\n' + jsmsg + '\n``` Make an appointment https://idco.dmdc.osd.mil/idco/locator');
                });
            })

            rrequest.on('error', (error) => {
                console.log('An error', error);
            });
            rrequest.end()
            break;

        case "!x":
            const xurl = "https://idco.dmdc.osd.mil/idco/locator/site/170805/appnt/"
                + date.getFullYear() + "-" + (date.getMonth() + 1);

            const xrequest = https.request(xurl, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data = data + chunk.toString();
                });

                response.on('end', () => {
                    const body = JSON.parse(data);
                    const filt = body.filter(function (item) { return item.open != "0"; });
                    const jsmsg = JSON.stringify(filt, null, 2)
                    console.log('!x\n' + jsmsg);
                    msg.channel.send('X Technologies, Inc. https://goo.gl/maps/5KcGYudM5jPTM9vU8\n Open appointments for ' + (date.getMonth() + 1) + '-' + date.getFullYear() + '\n' + '```json\n' + jsmsg + '\n``` Make an appointment https://idco.dmdc.osd.mil/idco/locator');
                });
            })

            xrequest.on('error', (error) => {
                console.log('An error', error);
            });
            xrequest.end()
            break;

    }
})
client.login(process.env.DISCORD_TOKEN);
