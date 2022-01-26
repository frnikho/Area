import Route from "../../Route";
import express = require('express');
import {authorization} from "../../middlewares/AuthMiddleware";
import ServiceRoute from "./ServiceRoute";
import ServiceController from "../../controllers/ServiceController";
import {Services} from "../../models/Services"

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
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        };

        let body = {
            code: code,
            client_id: process.env.GITHUB_SERVICES_CLIENT_ID,
            client_secret: process.env.GITHUB_SERVICES_SECRET,
            redirect_uri: process.env.GITHUB_SERVICES_REDIRECT_URL,
        }

        new ServiceRoute().postRequest("https://github.com/login/oauth/access_token", body, headers, req['user']['uuid'], Services.GITHUB.valueOf(), (token) => {
            return res.status(200).json({success: true, token: token});
        }, (err) => {
            return res.status(400).json({success: false, error: err});
        });
    }

    private login(req: express.Request, res: express.Response) {
        return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_SERVICES_CLIENT_ID}&scope=repo%20admin:repo_hook`);
    }
}
