import Route from "../../Route";

import express = require('express');
import UserController from "../../controllers/UserController";
import JWTService from "../../services/JWTService";

export default class LoginRoute extends Route {

    constructor() {
        super();
        this.router.post('/', this.verifyBody, this.post);
    }

    private verifyBody(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const {email, password}: {email: string, password: string} = req.body;
        if (email === undefined || password === undefined) {
            res.status(400).json({success: false, error: 'Required email and password body data !'});
            return;
        }
        req['email'] = email;
        req['password'] = password;
        next();
    }

    private post(req: express.Request, res: express.Response): void {
        new UserController().login(req['email'], req['password'], (user) => {
            return res.status(200).json({success: true, token: new JWTService({
                    uuid: user.uuid,
                    email: user.email,
                }).sign()})
        }, (msg) => {
            return res.status(400).json({success: false, error: msg});
        });
    }

}
