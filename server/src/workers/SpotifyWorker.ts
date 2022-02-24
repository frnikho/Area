import Worker from "./Worker";
import {ActionType} from "../models/Applet";
import SpotifyYepHook from "../yephook/SpotifyYepHook";
import SpotifySongChangedYephook from "../yephook/spotify/SpotifySongChangedYephook";

export default class SpotifyWorker extends Worker {

    private yepHooks: SpotifyYepHook[] = [];

    constructor() {
        super();
    }

    getTime(): number {
        return 10;
    }

    run() {
        this.getApplets('spotify', (applets) => {
            const tmpArray: string[] = [];
            applets.forEach((applet) => {
                tmpArray.push(applet.uuid);
                if (this.yepHooks.find((yepHook) => yepHook.getApplet().uuid === applet.uuid) === undefined) {
                    if (applet.action_type === ActionType.spotify_song_changed) {
                        const newYepHook: SpotifyYepHook = new SpotifySongChangedYephook(applet);
                        newYepHook.start();
                        this.yepHooks.push(newYepHook);
                    }
                }
            });

            this.yepHooks.forEach((yepHook, index) => {
                const uuidToRemoved = tmpArray.find((uuid) => yepHook.getApplet().uuid);
                if (uuidToRemoved === undefined) {
                    console.log("spotify applet need to be removed !");
                    yepHook.stop();
                    this.yepHooks.splice(index, 1);
                }
            })
        })
    }
}
