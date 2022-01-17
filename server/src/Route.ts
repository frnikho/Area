import express = require('express');

export default abstract class Route {

    protected router: express.Router;

    protected constructor() {
        this.router = express.Router();
    }

    public register(app: express.Application, path: string) {
        app.use(path, this.router);
    }

    protected getRouter(): express.Router {
        return this.router;
    }

}
