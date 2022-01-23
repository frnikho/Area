import express = require('express');
import {Intents} from "discord.js";
const discord = require("discord.js");

export default class DiscordWebhook {

    private client;
    private router: express.Router;

    public constructor() {
        this.client = new discord.Client({
            intents: ["GUILDS", "GUILD_MESSAGES", "GUILDS", "GUILD_INTEGRATIONS"],
        });
        this.client.login(process.env.DISCORD_SERVICES_BOT_TOKEN);
        this.client.on("ready", () => {
            this.client.user.setActivity("Generate some OP code :0", {type: "WATCHING"})
            console.log("Bot online !");
        })
        this.client.on("messageCreate", msg=>console.log(msg));
        this.client.on("channelCreate", msg=>console.log(msg));

        this.router = express.Router();
        this.router.post('/api/discord/webhook', this.onPost);
    }

    public createMiddleware(): express.Router {
        return this.router;
    }

    public onPost(req: express.Request, res: express.Response) {



    }

}
