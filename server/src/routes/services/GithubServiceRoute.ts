import Route from "../../Route";
import express = require('express');
import {authorization} from "../../middlewares/AuthMiddleware";

import ServiceRoute from "./ServiceRoute";
import ServiceController from "../../controllers/ServiceController";

export default class GithubServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
        this.router.get('/list', authorization, this.list);
        this.router.get('/', this.login);
    }

    private list(req: express.Request, res: express.Response) {
        new ServiceController().getTokensForService(req['user']['uuid'], 'github', () => {

        }, err => {});
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
        params.append('client_id', process.env.GITHUB_SERVICES_CLIENT_ID);
        params.append('client_secret', process.env.GITHUB_SERVICES_CLIENT_SECRET);
        params.append('redirect_uri', process.env.GITHUB_SERVICES_REDIRECT_URL);

        new ServiceRoute().request("https://github.com/login/oauth/access_token", params, headers, req['user']['uuid'], "github", (token) => {
            return res.status(200).json({success: true, token: token});
        }, (err) => {
            return res.status(400).json({success: false, error: err});
        });
    }

    private login(req: express.Request, res: express.Response) {
        return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_SERVICES_CLIENT_ID}&scope=repo%20admin:repo_hook`);
    }
}
