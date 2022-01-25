import Route from "../../Route";

import express = require('express');
import {authorization} from "../../middlewares/AuthMiddleware";
import ServiceRoute from "./ServiceRoute"

export default class SlackServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
        this.router.get('/', this.login);
    }

    private callback(req: express.Request, res: express.Response) {
        const code: string = req.query['code'] as string;

        const headers = {
            headers: {
                "Accept": "application/json"
            }
        };

        const params = new URLSearchParams();
        params.append('code', code);
        params.append('client_id', process.env.SLACK_SERVICES_CLIENT_ID);
        params.append('client_secret', process.env.SLACK_SERVICES_CLIENT_SECRET);

        new ServiceRoute().request("https://slack.com/api/oauth.access", params, headers, req['user']['uuid'], "slack", (token) => {
            return res.status(200).json({success: true, token: token});
        }, (err) => {
            return res.status(400).json({success: false, error: err});
        });
    }

    private login(req: express.Request, res: express.Response) {
        return res.redirect("https://slack.com/oauth/authorize?"
        + "client_id=" + process.env.SLACK_SERVICES_CLIENT_ID + "&"
        + "scope=chat:write:bot&");
    }
}
