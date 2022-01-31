import Route from "../../Route";
import express = require('express');

export default class TrelloServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/callback', this.callback);
        this.router.get('/', this.login);
    }

    public callback(req: express.Request, res: express.Response) {
        console.log(req.path);
    }

    private login(req: express.Request, res: express.Response) {
        return res.redirect('https://trello.com/1/authorize?expiration=never&name=MyPersonalToken&scope=read,write&response_type=token&key=254f78a47571706f37b4f9cff2f38600&return_url=https://localhost:8080/services/auth/trello/callback');
    }

}
