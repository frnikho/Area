import Worker, {hooks} from "./Worker";
import {ActionType, Applet} from "../models/Applet";
import ServiceController from "../controllers/ServiceController";

export default class SpotifyWorker extends Worker {

    private yephooks = [];

    private hooks: hooks[] = [{
        actionType: ActionType.spotify_song_changed,
        func: this.spotifySongChanged,
    }]

    constructor() {
        super();
    }

    public manageHook(applet: Applet) {
        this.hooks.map((hook) => {
            if (hook.actionType === applet.action_type) {
                hook.func(applet)
            }
        })
    }

    public getTime(): number {
        return 1;
    }

    public run() {
        this.getApplets('spotify', (applets) => {
            applets.forEach((applet) => {
                this.manageHook(applet);
            });
        });
    }

    public spotifySongChanged(applet: Applet) {
        new ServiceController().getTokenByKeyAndService(applet.user_uuid, 'spotify', applet.action_key, (token) => {
            if (token === null) {
                console.log("Token error !");
                return;
            }



        }, (error) => {
            console.log(error);
        })
    }

}
