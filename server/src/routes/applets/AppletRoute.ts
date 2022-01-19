import express = require('express')
import Route from "../../Route";
import {authorization} from "../../middlewares/AuthMiddleware";
import AppletController from "../../controllers/AppletController";
import {parseAppletBody, parseAppletParams} from "../../middlewares/AppletMiddleware";

export default class AppletRoute extends Route {

    constructor() {
        super();
        this.router.get('/:appletUuid', parseAppletParams ,authorization, this.get);
        this.router.get('/all', authorization, this.getAll)
        this.router.post('/toggle', parseAppletBody, authorization, this.toggle);
        this.router.post('/enable', parseAppletBody, authorization, this.enable);
        this.router.post('/disable', parseAppletBody, authorization, this.disable);
        this.router.post('/', authorization, this.create);
        this.router.delete('/', parseAppletBody, authorization, this.delete);
        this.router.patch('/', parseAppletBody, authorization, this.update);
    }

    private getAll(req: express.Request, res: express.Response) {
        new AppletController().getAppletsByUserUuid(req['user']['uuid'], (applets) => {
            return res.status(200).json({success: true, data: applets});
        }, (err) => res.status(400).json({success: false, error: err}));
    }

    private get(req: express.Request, res: express.Response) {
        console.log(req.params);
    }

    private create(req: express.Request, res: express.Response) {

    }

    private delete(req: express.Request, res: express.Response) {

    }

    private update(req: express.Request, res: express.Response) {

    }

    private enable(req: express.Request, res: express.Response) {

    }

    private disable(req: express.Request, res: express.Response) {

    }

    private toggle(req: express.Request, res: express.Response) {

    }

}
