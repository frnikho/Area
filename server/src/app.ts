import {Express} from "express";

const express = require('express');
const dotenv = require('dotenv');
import http = require("http");
const DEFAULT_PORT = 8080;

export default class App {

    private port: number;
    private readonly server: http.Server;
    private readonly app: Express;

    constructor() {
        this.initConfig();
        this.port =  Number.parseInt(process.env.PORT) || DEFAULT_PORT;
        this.app = express();
        this.server = http.createServer(this.app);
    }

    private initConfig(): void {
        dotenv.config();
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`server is listening on ${this.port}`);
        })
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