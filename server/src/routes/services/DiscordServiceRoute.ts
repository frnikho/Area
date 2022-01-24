import Route from "../../Route";
import express = require('express');
import ServiceRoute from "./ServiceRoute"
import {authorization} from "../../middlewares/AuthMiddleware";

export default class DiscordServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
        this.router.get('/', this.login);
    }

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
        params.append('scope', "bot");
        params.append('redirect_uri', process.env.DISCORD_SERVICES_REDIRECT_URL);

        new ServiceRoute().request("https://discord.com/api/oauth2/token", params, headers, req['user']['uuid'], "discord", (token) => {
            console.log(token);
            return res.status(200).json({success: true, token: token});
        }, (err) => {
            return res.status(400).json({success: false, error: err});
        });
    }

    private login(req: express.Request, res: express.Response) {
        return res.redirect("https://discord.com/api/oauth2/authorize?"
        + "client_id=" + process.env.DISCORD_SERVICES_CLIENT_ID + "&"
        + "scope=bot&"
        + "permissions=274877908992&"
        + "response_type=code");
    }
}
