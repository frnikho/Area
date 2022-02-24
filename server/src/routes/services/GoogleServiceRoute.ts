import Route from "../../Route";
import express = require('express');
import {authorization} from "../../middlewares/AuthMiddleware";

export default class GoogleServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
    }

    public callback(req: express.Request, res: express.Response) {

    }

}
