import Route from "../Route";

import express = require('express');
import {AppAbout} from "../globals/AppletsGlobal";

export default class AboutRoute extends Route {

    constructor() {
        super();
        this.router.all('/', AboutRoute.about);
    }

    private static about(req: express.Request, res: express.Response) {
        const currentTime: number = new Date().getTime();
        return res.status(200).json({
            client: {
                host: req.headers['x-forwarded-for'] || req.socket.remoteAddress
            },
            server: {
                current_time: currentTime,
                services: AppAbout.server.services
            }
        })
    }
}
