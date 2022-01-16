import Route from "../../Route";

import express = require('express');

export default class LoginRoute extends Route {

    constructor() {
        super();
        this.router.post('/', this.verifyBody, this.post);
    }

    private verifyBody(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const {email, password}: {email: string, password: string} = req.body;
        if (email === undefined || password === undefined)
            res.status(400).json({success: false, error: 'Required email and password body data !'});
        req['email'] = email;
        req['password'] = password;
        next();
    }

    private post(req: express.Request, res: express.Response): void {

    }

}
