import Route from "../../Route";
import {authorization} from "../../middlewares/AuthMiddleware";

import express = require('express');
import UserController from "../../controllers/UserController";

export default class MeRoute extends Route {

    constructor() {
        super();
        this.router.get('/', authorization, this.get);
        this.router.patch('/', authorization, this.patch);
        this.router.delete('/', authorization, this.delete);
    }

    private get(req: express.Request, res: express.Response): void {
        res.status(200).json(req['user']);
    }

    private patch(req: express.Request, res: express.Response) {
        const {firstname, lastname} = req.body;
        if (firstname === undefined && lastname === undefined)
            return res.status(400).json({success: false, error: `required 'firstname' or 'lastname' body parameters !`});
        if (firstname !== undefined)
            req['user'].firstname = firstname;
        if (lastname !== undefined)
            req['user'].firstname = lastname;
        new UserController().update(req['user'], () => {
            return res.status(200).json({success: true});
        }, (err) => {
            return res.status(400).json({success: false, error: err});
        })
    }

    private delete(req: express.Request, res:express.Response): void {
        new UserController().delete(req['user'], () => {
            return res.status(200).json({success: true});
        }, (err) => {
            return res.status(400).json({success: false, error: err})
        })
    }

}
