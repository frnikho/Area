import Route from "../../Route";
import {authorization} from "../../middlewares/AuthMiddleware";

import express = require('express');

export default class MeRoute extends Route {

    constructor() {
        super();
        this.router.get('/', authorization, this.get);
    }

    private get(req: express.Request, res: express.Response): void {
        res.status(200).json(req['user']);
    }

}
