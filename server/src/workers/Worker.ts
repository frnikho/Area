import {ActionType, Applet} from "../models/Applet";
import AppletController from "../controllers/AppletController";

export type func = (applet: Applet) => void;
export type hooks = {actionType: ActionType, func: func}

export default abstract class Worker {

    private timer: NodeJS.Timer;

    protected constructor() {
        this.getApplets = this.getApplets.bind(this);
    }

    public getApplets(service: string, callback: (applets: Applet[]) => void): void {
        new AppletController().getAppletsByService(service, (response) => {
            if (response.length === 0)
                return callback([]);
            return callback(response.map((applet) => applet as Applet));
        }, (err) => callback([]));
    }

    public abstract manageHook(applet: Applet);

    public start() {
        if (this.getTime() <= 0)
            throw new Error("Invalid time for Worker ! (must be > 0)");
        this.timer = setInterval(() => this.run(), this.getTime() * 1000);
    }

    public stop() {
        clearInterval(this.timer);
    }

    public abstract getTime(): number;

    public abstract run();

}

