import express = require('express')
import Route from "../../Route";
import {authorization} from "../../middlewares/AuthMiddleware";
import AppletController from "../../controllers/AppletController";
import {checkNewApplet, parseAppletBody, parseAppletParams} from "../../middlewares/AppletMiddleware";

export default class AppletRoute extends Route {

    constructor() {
        super();
        this.router.get('/all', authorization, this.getAll) //GOOD
        this.router.get('/:appletUuid', parseAppletParams, authorization, this.get); //GOOD
        this.router.delete('/:appletUuid', parseAppletParams, authorization, this.delete); //GOOD
        this.router.post('/toggle', parseAppletBody, authorization, this.toggle); //GOOD
        this.router.post('/enable', parseAppletBody, authorization, this.enable); //GOOD
        this.router.post('/disable', parseAppletBody, authorization, this.disable); //GOOD
        this.router.post('/', authorization, checkNewApplet, this.create); //GOOD
        this.router.patch('/', parseAppletBody, authorization, this.update); //TODO
    }

    private getAll(req: express.Request, res: express.Response) {
        new AppletController().getAppletsByUserUuid(req['user']['uuid'], (applets) => {
            return res.status(200).json({success: true, data: applets});
        }, (err) => res.status(400).json({success: false, error: err}));
    }

    private get(req: express.Request, res: express.Response) {
        return res.status(200).json(req['applet']);
    }

    private create(req: express.Request, res: express.Response) {
        new AppletController().registerApplets(req['applet'], req['user']['uuid'],(applet) => {
            return res.status(200).json({success: true, applet: applet});
        }, (err) => {
            return res.status(400).json({success: false, error: err})
        });
    }

    private delete(req: express.Request, res: express.Response) {
        new AppletController().deleteApplet(req['applet']['uuid'], (success) => {
            return res.status(200).json({success: success});
        });
    }

    private update(req: express.Request, res: express.Response) {

    }

    private enable(req: express.Request, res: express.Response) {
        new AppletController().enableAppletByUuid(req['applet']['uuid'], (success) => {
            return res.status(200).json({success: success});
        });
    }

    private disable(req: express.Request, res: express.Response) {
        new AppletController().disableAppletByUuid(req['applet']['uuid'], (success) => {
            return res.status(200).json({success: success});
        });
    }

    private toggle(req: express.Request, res: express.Response) {
        if (req['applet']['enable'] === 1) {
            new AppletController().disableAppletByUuid(req['applet']['uuid'], (success) => {
                return res.status(200).json({success: success});
            });
        } else {
            new AppletController().enableAppletByUuid(req['applet']['uuid'], (success) => {
                return res.status(200).json({success: success});
            });
        }
    }

}
