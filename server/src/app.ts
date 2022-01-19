import {Express} from "express";

const express = require('express');
const dotenv = require('dotenv');
import cors = require('cors');
import bodyParser = require('body-parser');
import RegisterRoute from "./routes/auth/RegisterRoute";
import LoginRoute from "./routes/auth/LoginRoute";
import VerifyEmailRoute from "./routes/auth/VerifyEmailRoute";
import GithubLoginRoute from "./routes/auth/oauth/GithubLoginRoute";
import MeRoute from "./routes/users/MeRoute";
import GoogleLoginRoute from "./routes/auth/oauth/GoogleLoginRoute";
import SlackLoginRoute from "./routes/auth/oauth/SlackLoginRoute";
import fs = require("fs");
import https = require("https");

const DEFAULT_PORT = 8080;

export default class App {

    private port: number;
    private readonly server: https.Server;
    private readonly app: Express;
    private readonly privateKey: string;
    private readonly privateCertificate: string;

    constructor() {
        this.initConfig();
        this.port = Number.parseInt(process.env.PORT) || DEFAULT_PORT;
        this.privateKey = fs.readFileSync("./sslCredentials/sslKey.key", "utf8");
        this.privateCertificate = fs.readFileSync("./sslCredentials/sslCertificate.crt", "utf8");
        this.app = express();
        this.initMiddlewares();
        this.initRoutes();
        this.server = https.createServer({key: this.privateKey, cert: this.privateCertificate}, this.app);
    }

    private initConfig(): void {
        dotenv.config();
    }

    private initMiddlewares(): void {
        this.app.use(cors())
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
    }

    private initRoutes(): void  {
        // AUTH ROUTES
        new RegisterRoute().register(this.app, '/auth/register');
        new LoginRoute().register(this.app, '/auth/login');
        new VerifyEmailRoute().register(this.app, '/auth/verify');
        new GithubLoginRoute().register(this.app, '/auth/github');
        new GoogleLoginRoute().register(this.app, '/auth/google');
        new SlackLoginRoute().register(this.app, '/auth/slack');

        // USERS ROUTES
        new MeRoute().register(this.app, '/me');
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`server is listening on https://localhost:${this.port}/`);
        });
    }

    public setPort(port: number): void {
        this.port = port;
    }

    public getPort(): number {
        return this.port;
    }

    public stop(): void {
    }
}

const app: App = new App();
app.start();
