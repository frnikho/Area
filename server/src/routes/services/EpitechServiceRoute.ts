import Route from "../../Route";
import express = require('express');
import {authorization} from "../../middlewares/AuthMiddleware";
import EpitechService from "../../services/external/EpitechService";
import ServiceAuthRoute from "./ServiceAuthRoute";
import {User} from "../../models/User";

export default class EpitechServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
    }

    private callback(req: express.Request, res: express.Response) {
        const {url} = req.query;
        const user: User = req['user'];
        if (url === undefined)
            return res.status(400).json({success: false, message: "Url query parameters required !"});
        EpitechService.getUser(url as string, (success, error) => {
            if (error)
                return res.status(400).json({success: false, message: error});
            return res.status(200).json(ServiceAuthRoute.token({url: url as string, user: success}));
        });
    }

}
