import Route from "../../Route";

import axios from 'axios';
import express = require('express');
import randomstring = require('randomstring');
import ServiceController, {TokenData} from "../../controllers/ServiceController";
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

        const oauthUrl = "https://slack.com/api/oauth.access?"
            + "client_id=" + process.env.SLACK_CLIENT_ID + "&"
            + "client_secret=" + process.env.SLACK_CLIENT_SECRET + "&"
            + "code=" + code;
        new ServiceRoute().request(oauthUrl, req['user']['uuid'], "slack", (token) => {
            return res.status(200).json({success: true, token: token});
        }, (err) => {
            return res.status(400).json({success: false, error: err});
        });
    }

    private login(req: express.Request, res: express.Response) {
        return res.redirect("https://slack.com/oauth/authorize?"
        + "client_id=" + process.env.SLACK_CLIENT_ID + "&"
        + "scope=chat:write:bot&");
    }
}
