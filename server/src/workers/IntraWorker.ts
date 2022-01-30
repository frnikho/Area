import Worker, {hooks} from "./Worker";
import {Action, ActionType, Applet} from "../models/Applet";
import AppletController from "../controllers/AppletController";
import IntraYephook from "../yephook/IntraEpitech/IntraYephook";
import NotificationEpitechIntraYephook from "../yephook/IntraEpitech/NotificationEpitechIntraYephook";
import {ingredientsHook} from "../utils/Ingredients";

export default class IntraWorker extends Worker {

    private yebhooks: IntraYephook[] = [];

    private hooks: hooks[] = [{
        actionType: ActionType.intra_new_notifications,
        func: this.intraNewNotifications,
    }]

    constructor() {
        super();
    }

    public getTime(): number {
        return 5;
    }

    public manageHook(applet: Applet) {
        this.hooks.map((hook) => {
            if (hook.actionType === applet.action_type) {
                hook.func(applet)
            }
        })
    }

    public run() {
        this.getApplets('intra', (applets) => {
            applets.forEach((applet) => {
                this.manageHook(applet);
            });
        });
    }

    private intraNewNotifications(applet: Applet): void {
        let action: Action = applet.action;
        try {
            let authLink: string = action.parameters.filter((params) => params !== null && params["name"] === "login_link")[0]['value'];
            if (this.yebhooks === undefined)
                this.yebhooks = [];
            let existing = this.yebhooks.filter((hook) => hook.getAuthLink() === authLink);
            if (existing.length === 0 ) {
                let intra = new NotificationEpitechIntraYephook(authLink, authLink, (oldData, newData) => {
                    try {
                        new AppletController().callReactions(applet, ingredientsHook(newData.history[0], ActionType.intra_new_notifications), (err) => {
                            if (err)
                                console.log(err);
                        })
                    } catch (err) {
                        console.log("ERROR !");
                        console.log(err);
                    }
                });
                this.yebhooks.push(intra);
                intra.startChecking();
            }
        } catch (ex) {
            console.log(ex);
            return;
        }
    }
}
