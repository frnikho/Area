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
    }

    private login(req: express.Request, res: express.Response) {
        return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URL_SERVICE}`
            + `scope=admin:repo_hook`);
    }

}
