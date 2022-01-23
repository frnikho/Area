import express = require('express');
const discord = require("discord.js");

export default class DiscordWebhook {

    private client;
    private router: express.Router;

    public constructor() {
        this.client = new discord.Client({
            intents: ["GUILDS", "GUILD_MESSAGES", "GUILDS", "GUILD_INTEGRATIONS"],
        });
        this.client.on("ready", () => {
            this.client.user.setActivity("Generate some OP code :0", {type: "WATCHING"})
            console.log("Bot online !");
        })
        this.client.on("messageCreate", this.onMessageCreated.bind(this));
        this.client.on("channelCreate", this.onChannelCreated.bind(this));
    }

    public loginBot() {
        this.client.login(process.env.DISCORD_SERVICES_BOT_TOKEN);
    }

    public onMessageCreated(data) {

    }

    public onChannelCreated(data) {

    }

}
