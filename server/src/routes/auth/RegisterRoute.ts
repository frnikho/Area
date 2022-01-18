import Route from "../../Route";
import express = require('express');
import Credentials from "../../utils/Credentials";
import UserController from "../../controllers/UserController";

export interface RegisterBody {
    email: string,
    password: string,
    firstname: string,
    lastname: string
}

export default class RegisterRoute extends Route {

    constructor() {
        super();
        this.router.post('/', this.checkBodyParameters, this.post);
    }

    private checkBodyParameters(req: express.Request, res: express.Response, next: express.NextFunction): void {
        let body: RegisterBody = req.body;
        Credentials.verifyEmail(body.email, () => {
            Credentials.verifyPasswordStrength(body.password, () => {
                req['registerBody'] = body;
               next();
            }, (msg) => {
                res.status(400).json({success: false, error: msg});
            });
        }, (msg) => {
            res.status(400).json({success: false, error: msg});
        });
    }

    private post(req: express.Request, res: express.Response): void {
        let body: RegisterBody = req['registerBody'];
        new UserController().register(body, (user) => {
            res.status(200).json({success: true, user});
        }, (msg) => {
            res.status(400).json({success: false, error: msg});
        });
    }

}
