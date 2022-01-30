import {Express} from "express";

const express = require('express');
const dotenv = require('dotenv');

import cors = require('cors');
import fs = require("fs");
import https = require("https");
import bodyParser = require('body-parser');
import RegisterRoute from "./routes/auth/RegisterRoute";
import LoginRoute from "./routes/auth/LoginRoute";
import VerifyEmailRoute from "./routes/auth/VerifyEmailRoute";
import GithubLoginRoute from "./routes/auth/oauth/GithubLoginRoute";
import MeRoute from "./routes/users/MeRoute";
import GoogleLoginRoute from "./routes/auth/oauth/GoogleLoginRoute";
import GithubServiceRoute from "./routes/services/GithubServiceRoute";
import AppletRoute from "./routes/applets/AppletRoute";
import GithubWebhook from "./webhooks/GithubWebhook";

const { createNodeMiddleware } = require("@octokit/webhooks");
import SlackServiceRoute from "./routes/services/SlackServiceRoute";
import DiscordServiceRoute from "./routes/services/DiscordServiceRoute";
import DiscordBot from "./bots/DiscordBot";
import AboutRoute from "./routes/AboutRoute";
import SlackBot from "./bots/SlackBot";
import WorkerManager from "./managers/WorkerManager";
import TrelloServiceRoute from "./routes/services/TrelloServiceRoute";
import PaypalServiceRoute from "./routes/services/PaypalServiceRoute";
import SpotifyServiceRoute from "./routes/services/SpotifyServiceRoute";
import {GooglePubSub} from "./clients/GooglePubSub";

const DEFAULT_PORT = 8080;

export default class App {

    private port: number;
    private readonly server: https.Server;
    private readonly app: Express;
    private readonly privateKey: string;
    private readonly privateCertificate: string;
    private workerManager: WorkerManager;

    constructor() {
        this.initConfig();
        this.port = Number.parseInt(process.env.PORT) || DEFAULT_PORT;
        this.privateKey = fs.readFileSync("./sslCredentials/sslKey.key", "utf8");
        this.privateCertificate = fs.readFileSync("./sslCredentials/sslCertificate.crt", "utf8");
        this.app = express();
        this.initMiddlewares();
        this.initWebhooks();
        this.initRoutes();
        this.initBot();
        this.workerManager = WorkerManager.get();
        this.workerManager.startWorkers();
        this.server = https.createServer({key: this.privateKey, cert: this.privateCertificate, rejectUnauthorized: false}, this.app);
    }

    private initConfig(): void {
        dotenv.config();
    }

    private initMiddlewares(): void {
        this.app.use(cors())
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
    }

    private initWebhooks(): void {
        let github = new GithubWebhook();
        this.app.use(createNodeMiddleware(github.getWebhooks()));
        github.init();
    }

    private initBot(): void {
        let discord = new DiscordBot();
        discord.login();
        let slack = new SlackBot();
        let googleClient: GooglePubSub = new GooglePubSub();
        googleClient.test();
    }

    private initRoutes(): void  {
        // AUTH ROUTES
        new RegisterRoute().register(this.app, '/auth/register');
        new LoginRoute().register(this.app, '/auth/login');
        new VerifyEmailRoute().register(this.app, '/auth/verify');
        new GithubLoginRoute().register(this.app, '/auth/github');
        new GoogleLoginRoute().register(this.app, '/auth/google');

        // USERS ROUTES
        new MeRoute().register(this.app, '/me');

        // SERVICES ROUTES
        new GithubServiceRoute().register(this.app, '/services/auth/github');
        new SlackServiceRoute().register(this.app, '/services/auth/slack');
        new DiscordServiceRoute().register(this.app, '/services/auth/discord');
        new TrelloServiceRoute().register(this.app, '/services/auth/trello');
        new PaypalServiceRoute().register(this.app, '/services/auth/paypal');
        new SpotifyServiceRoute().register(this.app, '/services/spotify');

        // APPLETS ROUTES
        new AppletRoute().register(this.app, '/applets');

        // ABOUT ROUTE
        new AboutRoute().register(this.app, '/about.json');

        // 404 ROUTE
        //this.app.use('*', RouteNotFoundMiddleware);
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
