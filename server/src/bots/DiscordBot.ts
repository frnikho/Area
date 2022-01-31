import express = require('express');
import AppletController from "../controllers/AppletController";
import {Action, ActionType} from "../models/Applet";
import {ingredientsHook} from "../utils/Ingredients";
import Logger from "../utils/Logger";

const discord = require("discord.js");

export default class DiscordBot {

    private static client = undefined;
    private router: express.Router;

    public constructor() {
        if (DiscordBot.client !== undefined)
            throw new Error('You can only create a instance of this class !');
        DiscordBot.client = new discord.Client({
            intents: ["GUILDS", "GUILD_MESSAGES", "GUILDS", "GUILD_INTEGRATIONS", "GUILD_MEMBERS", "GUILD_BANS", "DIRECT_MESSAGES"],
            partials: ["MESSAGE", "CHANNEL", "USER"],
        });
        DiscordBot.client.on("ready", () => {
            DiscordBot.client.user.setActivity("Generate some OP code :0", {type: "WATCHING"});
            Logger.i("Discord", "Discord Bot is online !");
        })
        DiscordBot.client.on("messageCreate", this.onMessageCreated.bind(this));
        DiscordBot.client.on("channelCreate", this.onChannelCreated.bind(this));
        DiscordBot.client.on("channelRemove", this.onChannelDeleted.bind(this));
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
        Logger.d("Discord Bot", "On Message");
    }

    public onMessageCreated(data) {
        const actionKey = data.guildId;
        const authorId = data.author.id;

        if (data.channel.type === "DM")
            return this.onPrivateMessageReceived(data);

        const controller: AppletController = new AppletController();
        controller.getAppletsByTypeAndKey('discord_guild_message_received', actionKey, (applets) => {
            applets.map((applet) => {
                const action: Action = applet.action;
                const guildId = action.parameters.filter((param) => param['name'] === 'guild_id')[0];
                const userId = action.parameters.filter((param) => param['name'] === 'user_id')[0];
                if (authorId === userId['value'] && actionKey === guildId['value']) {
                    controller.callReactions(applet, ingredientsHook(data, ActionType.discord_guild_message_received), () => {
                        console.log("Applets reactions called successfully");
                    });
                }
            })
        }, (err) => {
            Logger.e("Discord Bot", err);
        });
    }

    public onPrivateMessageReceived(data) {
        const authorId = data.author.id;
        const controller: AppletController = new AppletController();
        controller.getAppletsByTypeAndKey('discord_private_message_received', authorId, (applets) => {
            applets.map((applet) => {
                const action: Action = applet.action;
                const userId = action.parameters.filter((param) => param['name'] === 'user_id')[0];
                if (authorId === userId['value']) {
                    controller.callReactions(applet, ingredientsHook(data, ActionType.discord_private_message_received), () => {
                        console.log("Applets reactions called successfully");
                    });
                }
            })
        }, (err) => {
            Logger.e("Discord Bot", err);
        });
    }

    public onMemberAdd(data) {
        const {user, guild} = data;
        const {guildId, name} = guild;
        const {username, id} = user;
        Logger.d("Discord Bot", "On Member Add");
    }

    public onMemberKick(data) {
        Logger.d("Discord Bot", "On member Kick");
    }

    public onChannelCreated(data) {
        const {type, guildId, name} = data;
        const controller: AppletController = new AppletController();
        controller.getAppletsByTypeAndKey('discord_channel_created', guildId, (applets) => {
            applets.map((applet) => {
                const action: Action = applet.action;
                const channelType = action.parameters.filter((param) => param['name'] === 'channel_type')[0];
                const guildIdP = action.parameters.filter((param) => param['name'] === 'guild_id')[0];
                if (guildId === guildIdP['value'] && channelType['value'] === type) {
                    controller.callReactions(applet, ingredientsHook(data, ActionType.discord_channel_created), () => {
                        console.log("Applets reactions called successfully");
                    });
                }
            })
        }, (err) => {
            Logger.e("Discord Bot", err);
        });
    }

    public onChannelDeleted(data) {
        Logger.e("Discord Bot", "on Channel Deleted");
    }

}
