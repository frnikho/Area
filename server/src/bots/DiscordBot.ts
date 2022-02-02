import express = require('express');
import AppletController from "../controllers/AppletController";
import {Action, ActionType} from "../models/Applet";
import {ingredientsHook} from "../utils/Ingredients";
import Logger from "../utils/Logger";
import {Intents} from "discord.js";

const discord = require("discord.js");

export default class DiscordBot {

    private static client = undefined;
    private router: express.Router;

    public constructor() {
        if (DiscordBot.client !== undefined)
            throw new Error('You can only create a instance of this class !');
        DiscordBot.client = new discord.Client({
            intents: ["GUILDS", "GUILD_MESSAGES", "GUILDS", "GUILD_INTEGRATIONS", "GUILD_MEMBERS", "GUILD_BANS", "DIRECT_MESSAGES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
            partials: ["MESSAGE", "CHANNEL", "USER", "REACTION"],
        });

        DiscordBot.client.on("ready", () => {
            DiscordBot.client.user.setActivity("Generate some OP code :0", {type: "WATCHING"});
            Logger.i("Discord", "Discord Bot is online !");
        })

        if (process.env.NODE_ENV === 'DEV')
            this.enableDebug();

        // NEW
        DiscordBot.client.on("guildBanAdd", this.onMemberGetBanned.bind(this));
        DiscordBot.client.on("guildBanRemove", this.onMemberGetUnbanned.bind(this));
        DiscordBot.client.on("guildUpdate", this.onGuildUpdate.bind(this));
        DiscordBot.client.on("messageDelete", this.onMessageDeleted.bind(this));
        DiscordBot.client.on("messageUpdate", this.onMessageUpdated.bind(this));
        DiscordBot.client.on("messageReactionAdd", this.onMessageReactionAdded.bind(this));
        DiscordBot.client.on("messageReactionRemove", this.onMessageReactionRemoved.bind(this));

        // WORK !
        DiscordBot.client.on("messageCreate", this.onMessageCreated.bind(this));
        DiscordBot.client.on("channelCreate", this.onChannelCreated.bind(this));

        // TO CHECK
        DiscordBot.client.on("guildMemberAdd", this.onMemberAdd.bind(this));
        DiscordBot.client.on("guildMemberRemove", this.onMemberKick.bind(this))
        DiscordBot.client.on("channelDelete", this.onChannelDeleted.bind(this));

    }

    private enableDebug() {
        DiscordBot.client.on("debug", (info) => {
            Logger.d("Discord", info);
        });

        DiscordBot.client.on("disconnect", () => {
            Logger.d("Discord", `The WebSocket has closed and will no longer attempt to reconnect`);
        });

        DiscordBot.client.on("error", (error) => Logger.d("Discord", error));

        DiscordBot.client.on("reconnecting", () => {
            Logger.d("Discord Reconnecting", `client tries to reconnect to the WebSocket`);
        });

        DiscordBot.client.on("resume", () => {
            Logger.d("Discord Resume", `whenever a WebSocket resumes`);
        });

        DiscordBot.client.on("warn", (data) => {
            Logger.d("Discord warning", data);
        })
    }

    public login() {
        DiscordBot.client.login(process.env.DISCORD_SERVICES_BOT_TOKEN);
    }

    public static getClient() {
        return DiscordBot.client;
    }

    public onMessageDeleted(data) {
        const {guildId} = data;
        Logger.d("Discord", "on Message Deleted", data);
        const controller: AppletController = new AppletController();
        controller.getAppletsByTypeAndKey('discord_guild_message_deleted', guildId, (applets) => {
            applets.map((applet) => {
                const action: Action = applet.action;
                const guildIdParam = action.parameters.filter((param) => param['name'] === 'guild_id')[0];
                if (guildId === guildIdParam['value']) {
                    controller.callReactions(applet, ingredientsHook(data, ActionType.discord_guild_message_deleted), () => {
                        console.log("Applets reactions called successfully");
                    });
                }
            })
        }, (err) => {
            Logger.e("Discord Bot", err);
        });
    }

    public onMessageUpdated(data) {
        const {guildId} = data;
        Logger.d("Discord", "on Message Updated");
        const controller: AppletController = new AppletController();
        controller.getAppletsByTypeAndKey('discord_guild_message_updated', guildId, (applets) => {
            applets.map((applet) => {
                const action: Action = applet.action;
                const guildIdParam = action.parameters.filter((param) => param['name'] === 'guild_id')[0];
                if (guildId === guildIdParam['value']) {
                    controller.callReactions(applet, ingredientsHook(data, ActionType.discord_guild_message_updated), () => {
                        console.log("Applets reactions called successfully");
                    });
                }
            })
        }, (err) => {
            Logger.e("Discord Bot", err);
        });
    }

    public onMessageReactionAdded(data) {
        const messageId = data.message.id;
        Logger.d("Discord", "on Message Reaction Added");

        const controller: AppletController = new AppletController();
        controller.getAppletsByTypeAndKey('discord_guild_message_reaction_add', messageId, (applets) => {
            applets.map((applet) => {
                const action: Action = applet.action;
                const messageIdParam = action.parameters.filter((param) => param['name'] === 'message_id')[0];
                if (messageId === messageIdParam['value']) {
                    controller.callReactions(applet, ingredientsHook(data, ActionType.discord_guild_message_reaction_add), () => {
                        console.log("Applets reactions called successfully");
                    });
                }
            })
        }, (err) => {
            Logger.e("Discord Bot", err);
        });
    }

    public onMessageReactionRemoved(data) {
        const messageId = data.message.id;
        Logger.d("Discord", "on Message Reaction Removed");

        const controller: AppletController = new AppletController();
        controller.getAppletsByTypeAndKey('discord_guild_message_reaction_removed', messageId, (applets) => {
            applets.map((applet) => {
                const action: Action = applet.action;
                const messageIdParam = action.parameters.filter((param) => param['name'] === 'message_id')[0];
                if (messageId === messageIdParam['value']) {
                    controller.callReactions(applet, ingredientsHook(data, ActionType.discord_guild_message_reaction_removed), () => {
                        console.log("Applets reactions called successfully");
                    });
                }
            })
        }, (err) => {
            Logger.e("Discord Bot", err);
        });
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

    public onGuildUpdate(data) {
        const guildId = data.id;
        Logger.i("Discord guild update");
        const controller: AppletController = new AppletController();
        controller.getAppletsByTypeAndKey('discord_guild_update', guildId, (applets) => {
            applets.map((applet) => {
                const action: Action = applet.action;
                const guildIdP = action.parameters.filter((param) => param['name'] === 'guild_id')[0];
                if (guildId === guildIdP['value']) {
                    controller.callReactions(applet, ingredientsHook(data, ActionType.discord_guild_update), () => {
                        console.log("Applets reactions called successfully");
                    });
                }
            })
        }, (err) => {
            Logger.e("Discord Bot", err);
        });
    }

    public onMemberGetUnbanned(data) {
        const guildId = data.guild.id;

        Logger.i("Discord", "on Member get Unbanned called");
        const controller: AppletController = new AppletController();
        controller.getAppletsByTypeAndKey('discord_guild_member_unbanned', guildId, (applets) => {
            applets.map((applet) => {
                const action: Action = applet.action;
                const guildIdP = action.parameters.filter((param) => param['name'] === 'guild_id')[0];
                if (guildId === guildIdP['value']) {
                    controller.callReactions(applet, ingredientsHook(data, ActionType.discord_guild_member_unbanned), () => {
                        console.log("Applets reactions called successfully");
                    });
                }
            })
        }, (err) => {
            Logger.e("Discord Bot", err);
        });
    }

    public onMemberGetBanned(data) {
        const guildId = data.guild.id;
        Logger.i("Discord", "on Member get banned called");
        const controller: AppletController = new AppletController();
        controller.getAppletsByTypeAndKey('discord_guild_member_banned', guildId, (applets) => {
            applets.map((applet) => {
                const action: Action = applet.action;
                const guildIdP = action.parameters.filter((param) => param['name'] === 'guild_id')[0];
                if (guildId === guildIdP['value']) {
                    controller.callReactions(applet, ingredientsHook(data, ActionType.discord_guild_member_banned), () => {
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

    public onChannelDeleted(data) {
        Logger.e("Discord Bot", "on Channel Deleted");
        const {type, guildId, name} = data;
        const controller: AppletController = new AppletController();
        controller.getAppletsByTypeAndKey('discord_channel_deleted', guildId, (applets) => {
            applets.map((applet) => {
                const action: Action = applet.action;
                const channelType = action.parameters.filter((param) => param['name'] === 'channel_type')[0];
                const guildIdP = action.parameters.filter((param) => param['name'] === 'guild_id')[0];
                if (guildId === guildIdP['value'] && channelType['value'] === type) {
                    controller.callReactions(applet, ingredientsHook(data, ActionType.discord_channel_deleted), () => {
                        console.log("Applets reactions called successfully");
                    });
                }
            })
        }, (err) => {
            Logger.e("Discord Bot", err);
        });
    }

    public onChannelCreated(data) {
        Logger.d("Discord", "on channel created !");
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
}
