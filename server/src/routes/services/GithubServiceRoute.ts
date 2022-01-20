import Route from "../../Route";
import express = require('express');
import {authorization} from "../../middlewares/AuthMiddleware";

import ServiceRoute from "./ServiceRoute";

export default class GithubServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
        this.router.get('/', this.login);
    }

    private callback(req: express.Request, res: express.Response) {
        const code: string = req.query['code'] as string;
        const url = "https://github.com/login/oauth/access_token?"
            + "client_id=" + process.env.GITHUB_SERVICES_CLIENT_ID + "&"
            + "client_secret=" + process.env.GITHUB_SERVICES_CLIENT_SECRET + "&"
            + "code=" + code + "&"
            + "redirect_uri=" + process.env.GITHUB_SERVICES_REDIRECT_URL + "&"
        new ServiceRoute().request(url, req['user']['uuid'], "github", (token) => {
            return res.status(200).json({success: true, token: token});
        }, (err) => {
            return res.status(400).json({success: false, error: err});
        });
    }

    private login(req: express.Request, res: express.Response) {
        return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_SERVICES_CLIENT_ID}`);
    }

}
