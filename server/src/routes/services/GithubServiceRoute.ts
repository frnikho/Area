import Route from "../../Route";

import randomstring = require('randomstring');

import express = require('express');

export default class GithubServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/login', this.login);
        this.router.get('/callback', this.callback);
    }

    private callback(req: express.Request, res: express.Response) {
        randomstring.generate();
        console.log(req.query);
    }

    private login(req: express.Request, res: express.Response) {
        return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&`
            + `scope=admin:repo_hook`);
    }

}
