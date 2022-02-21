import Route from "../../Route";
import express = require('express');
import ServiceAuthRoute from "./ServiceAuthRoute"
import {authorization} from "../../middlewares/AuthMiddleware";
import {Services} from "../../models/Services"
import axios from "axios";
import {User} from "../../models/User";
import {checkContext} from "../../middlewares/ContextMiddleware";
import {Context} from "../../models/Context";
import DiscordService from "../../services/external/DiscordService";

export default class DiscordServiceRoute extends Route {

    /**
     * Constructor
     */
    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
        this.router.get('/', this.login);
        this.router.get('/list', authorization, checkContext, this.list);
    }

    /**
     * @openapi
     * /services/discord/callback:
     *   get:
     *     tags:
     *       - Services
     *     description: Discord Service OAuth
     *     parameters:
     *       - in: path
     *         name: code
     *         schema:
     *           type: string
     *         description: Code given by Discord OAuth
     *         required: true
     *     responses:
     *       200:
     *         description: Successful login
     *       400:
     *         description: Error while login
     */
    private callback(req: express.Request, res: express.Response) {
        const code: string = req.query['code'] as string;

        const headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        const params = new URLSearchParams();
        params.append('code', code);
        params.append('client_id', process.env.DISCORD_SERVICES_CLIENT_ID);
        params.append('client_secret', process.env.DISCORD_SERVICES_CLIENT_SECRET);
        params.append('grant_type', "authorization_code");
        /*params.append('scope', "bot");*/
        params.append('redirect_uri', process.env.DISCORD_SERVICES_REDIRECT_URL);

        new ServiceAuthRoute().postRequest("https://discord.com/api/oauth2/token", params, headers, req['user']['uuid'], Services.DISCORD.valueOf(), (token) => {
            return res.status(200).json({success: true, token});
        }, (err) => {
            return res.status(400).json({success: false, error: err});
        });
    }

    /**
     * @openapi
     * /services/discord/list:
     *   get:
     *     tags:
     *       - Services
     *     description: List discord channels
     *     parameters:
     *       - in: path
     *         name: guild_id
     *         schema:
     *           type: string
     *         description: Guild id
     *         required: true
     *     responses:
     *       200:
     *         description: Successful login
     *       400:
     *         description: Error while login
     */
    private list(req: express.Request, res: express.Response) {
        const user: User = req['user'];
        const context: Context = req['context'];

        new DiscordService().listChannels(user, context, (success, error) => {
            if (error)
                return res.status(400).json({success: false, message: error});
            return res.status(200).json(success);
        });
    }

    /**
     * Login Route - TEMPORARY
     *
     * @param req
     * @param res
     * @returns
     */
    private login(req: express.Request, res: express.Response) {
        return res.redirect("https://discord.com/api/oauth2/authorize?"
        + "client_id=" + process.env.DISCORD_SERVICES_CLIENT_ID + "&"
        + "scope=identify%20email%20guilds%20connections%20bot%20messages.read&"
        + "permissions=8&"
        + "response_type=code");
    }
}
