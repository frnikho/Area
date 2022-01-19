import Route from "../../Route";

import axios from 'axios';
import express = require('express');
import randomstring = require('randomstring');
import ServiceController, {TokenData} from "../../controllers/ServiceController";
import {authorization} from "../../middlewares/AuthMiddleware";

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
        axios.post(oauthUrl,
            {
            headers: {
                "Accept": "application/json"
            }
        }).then((response) => {
            let {error, error_description, access_token, refresh_token} = response.data;
            if (error)
                return res.status(400).json({success: false, error: error_description});
            let token: TokenData = {
                key: randomstring.generate(),
                created_at: new Date(),
                type: 'slack',
                token: {
                    access_token: access_token,
                    refresh_token: refresh_token,
                }
            }
            new ServiceController().registerUserToken(req['user']['uuid'], token, () => {
                return res.status(200).json({success: true, token: token});
            }, (err) => {
                return res.status(400).json({success: false, error: err});
            })
            }, (msg) => {
                return res.status(400).json({success: false, error: msg});
            }
        );
    }

    private login(req: express.Request, res: express.Response) {
        return res.redirect("https://slack.com/oauth/authorize?"
        + "client_id=" + process.env.SLACK_CLIENT_ID + "&"
        + "scope=chat:write:bot&");
    }
}
