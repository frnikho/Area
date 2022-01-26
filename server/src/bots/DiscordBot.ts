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
            intents: ["GUILDS", "GUILD_MESSAGES", "GUILDS", "GUILD_INTEGRATIONS", "GUILD_MEMBERS", "GUILD_BANS", "DIRECT_MESSAGES"],
            partials: ["MESSAGE", "CHANNEL", "USER"],
        });
        DiscordBot.client.on("ready", () => {
            DiscordBot.client.user.setActivity("Generate some OP code :0", {type: "WATCHING"});
            console.log("Discord Bot is online !");
        })
        DiscordBot.client.on("messageCreate", this.onMessageCreated.bind(this));
        DiscordBot.client.on("channelCreate", this.onChannelCreated.bind(this));
        DiscordBot.client.on("guildMemberAdd", this.onMemberAdd.bind(this));
        DiscordBot.client.on("guildMemberRemove", this.onMemberKick.bind(this))
    }

    public login() {
        DiscordBot.client.login(process.env.DISCORD_SERVICES_BOT_TOKEN);
    }

    public static getClient() {
        return DiscordBot.client;
    }

    private onMessage(data) {
        console.log(data.channel.type);
    }

    public onMessageCreated(data) {
        const actionKey = data.guildId;
        const authorId = data.author.id;

        if (data.channel.type === "DM")
            return this.onPrivateMessageReceived(data);

        let controller: AppletController = new AppletController();
        controller.getAppletsByTypeAndKey('discord_guild_message_received', actionKey, (applets) => {
            applets.map((applet) => {
                let action: Action = applet.action;
                let guildId = action.parameters.filter((param) => param['name'] === 'guild_id')[0];
                let userId = action.parameters.filter((param) => param['name'] === 'user_id')[0];
                if (authorId === userId['value'] && actionKey === guildId['value']) {
                    controller.callReactions(applet, ingredientsHook(data, ActionType.discord_guild_message_received), () => {
                        console.log("Applets reactions called successfully");
                    });
                }
            })
        }, (err) => {
            console.log(err);
        });
    }

    public onPrivateMessageReceived(data) {
        console.log(data);
    }

    public onMemberAdd(data) {
        const {user, guild} = data;
        const {guildId, name} = guild;
        const {username, id} = user;
        console.log(data);
    }

    public onMemberKick(data) {
        console.log(data);
    }

    public onChannelCreated(data) {
        const {type, guildId, name} = data;
        console.log(data);
    }

}
