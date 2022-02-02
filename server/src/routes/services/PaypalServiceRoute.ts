import Route from "../../Route";

import express = require('express');

export default class PaypalServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/callback', this.callback);
        this.router.get('/', this.login);
    }

    private callback(req: express.Request, res: express.Response) {
        console.log(req.body);
        console.log(req.query);
        res.status(200).json({});
    }

    private login() {

    }

}
