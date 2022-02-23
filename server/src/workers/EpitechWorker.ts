import Worker from "./Worker";
import EpitechYepHook from "../yephook/EpitechYepHook";
import {ActionType} from "../models/Applet";
import EpitechNotificationYepHook from "../yephook/epitech/EpitechNotificationYepHook";

export default class EpitechWorker extends Worker {

    private yepHooks: EpitechYepHook[] = [];

    constructor() {
        super();
    }

    getTime(): number {
        return 60;
    }

    run() {
        this.getApplets('intra', (applets) => {
            const tmpArray: string[] = [];
            applets.forEach((applet) => {
                tmpArray.push(applet.uuid);
                if (this.yepHooks.find((yepHook) => yepHook.getApplet().uuid === applet.uuid) === undefined) {
                    if (applet.action_type === ActionType.intra_new_notifications) {
                        const newYepHook: EpitechYepHook = new EpitechNotificationYepHook(applet);
                        newYepHook.start();
                        this.yepHooks.push(newYepHook);
                    }
                }
            });

            this.yepHooks.forEach((yepHook, index) => {
                const uuidToRemoved = tmpArray.find((uuid) => yepHook.getApplet().uuid);
                if (uuidToRemoved === undefined) {
                    console.log("Applet need to be removed !");
                    yepHook.stop();
                    this.yepHooks.splice(index, 1);
                }
            })
        })
    }
}
