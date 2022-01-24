import express = require('express');
import AppletController from "../controllers/AppletController";
import {Action, ActionType} from "../models/Applet";
import {ingredientsHook} from "../utils/Ingredients";

const discord = require("discord.js");

export default class DiscordBot {

    private static client = undefined;
    private router: express.Router;

    public constructor() {
        if (DiscordBot.client !== undefined)
            throw "You can only create a instance of this class !";
        DiscordBot.client = new discord.Client({
            intents: ["GUILDS", "GUILD_MESSAGES", "GUILDS", "GUILD_INTEGRATIONS"],
        });
        DiscordBot.client.on("ready", () => {
            DiscordBot.client.user.setActivity("Generate some OP code :0", {type: "WATCHING"});
            console.log("Bot online !");
        })
        DiscordBot.client.on("messageCreate", this.onMessageCreated.bind(this));
        DiscordBot.client.on("channelCreate", this.onChannelCreated.bind(this));
    }

    public login() {
        DiscordBot.client.login(process.env.DISCORD_SERVICES_BOT_TOKEN);
    }

    public static getClient() {
        return DiscordBot.client;
    }

    public onMessageCreated(data) {
        const actionKey = data.guildId;
        const authorId = data.author.id;
        const message = data.content;

        let controller: AppletController = new AppletController();
        controller.getAppletsByTypeAndKey('discord_guild_message_received', actionKey, (applets) => {
            applets.map((applet) => {
                let action: Action = JSON.parse(<any>applet.action);
                let guildId = action.parameters.filter((param) => param['name'] === 'guild_id')[0];
                let userId = action.parameters.filter((param) => param['name'] === 'user_id')[0];

                if (authorId === userId['value'] && actionKey === guildId['value']) {
                    console.log(applet);
                    controller.callReactions(applet, ingredientsHook(data, ActionType.discord_guild_message_received), () => {
                        console.log("Applets reactions called successfully");
                    });
                }

            })
        }, (err) => {
            console.log(err);
        });

        console.log(data);
    }

    public onChannelCreated(data) {

    }

}
