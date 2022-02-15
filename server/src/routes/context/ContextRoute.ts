import Route from "../../Route";
import express = require('express');
import {authorization} from "../../middlewares/AuthMiddleware";
import {
    checkContextCreation,
    checkContextDelete,
    checkContextRead, checkContextReadAll,
    checkContextUpdate
} from "../../middlewares/ContextMiddleware";
import {User} from "../../models/User";
import {Context} from "../../models/Context";
import ContextController from "../../controllers/ContextController";
import {Services} from "../../models/Services";

export class ContextRoute extends Route {

    constructor() {
        super();
        this.router.get('/', authorization, checkContextRead, this.read);
        this.router.patch('/', authorization, checkContextUpdate, this.update);
        this.router.post('/', authorization, checkContextCreation, this.create);
        this.router.delete('/', authorization, checkContextDelete, this.delete);
        this.router.get('/all', authorization, checkContextReadAll, this.readAll);
    }

    public create(req: express.Request, res: express.Response) {
        const user: User = req['user'];
        const context: Context = req['context'];
        const service: string = req['service'];

        new ContextController().createContext(user.uuid, Services[service.toUpperCase()], context, (resultContext, error) => {
            if (error)
                return res.status(400).json({success: false, message: error});
            return res.status(200).json({success: true, context: resultContext, service});
        });
    }

    public read(req: express.Request, res: express.Response) {
        res.status(200).json(req['context']);
    }

    public readAll(req: express.Request, res: express.Response) {
        const service: string = req['service'];
        const user: User = req['user'];
        new ContextController().getContexts(user.uuid, Services[service.toUpperCase()], (contexts, error) => {
            if (error)
                return res.status(400).json({success: false, message: error});
            res.status(200).json(contexts);
        });
    }

    public delete(req: express.Request, res: express.Response) {
        const contextUuid = req['contextUuid'];
        const service: Services = req['service'];
        const user: User = req['user'];
        new ContextController().deleteContextByUuid(user.uuid, service, contextUuid, (error) => {
            if (error)
                return res.status(400).json({success: false, message: error});
            return res.status(200).json({success: true});
        });
    }

    public update(req: express.Request, res: express.Response) {
        const context = req['context'];
        const service: Services = req['service'];
        const user: User = req['user'];
        new ContextController().updateContext(user.uuid, service, context, (contextUpdated, error) => {
            if (error)
                return res.status(400).json({success: false, message: error});
            return res.status(200).json({success: true, context: contextUpdated});
        });
    }

}
