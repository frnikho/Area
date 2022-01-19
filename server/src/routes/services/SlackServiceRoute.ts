import Route from "../../Route";

import axios from 'axios';
import express = require('express');

export default class SlackServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/', this.post);
        this.router.get('/code', this.code);
    }

    private code(req: express.Request, res: express.Response) {
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
            let {error, error_description} = response.data;
            if (error)
                return res.status(400).json({success: false, error: error_description});
            console.log(response);
            return res.status(200);
            }, (msg) => {
                return res.status(400).json({success: false, error: msg});
            }
        );
    }

    private post(req: express.Request, res: express.Response) {
        return res.redirect("https://slack.com/oauth/authorize?"
        + "client_id=" + process.env.SLACK_CLIENT_ID + "&"
        + "scope=chat:write:bot&");
    }
}
