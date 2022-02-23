import EpitechYepHook from "../EpitechYepHook";
import {Action, ActionType, Applet} from "../../models/Applet";
import EpitechService from "../../services/external/EpitechService";
import Logger from "../../utils/Logger";
import AppletController from "../../controllers/AppletController";
import {ingredientsHook} from "../../utils/Ingredients";

interface JsonKey {
    id: string,
}

export default class EpitechNotificationYepHook extends EpitechYepHook {

    private data: JsonKey[] = [];

    constructor(applet: Applet) {
        super(60, applet);
        console.log("new Epitech notification yephook");
        this.onDataChanged = this.onDataChanged.bind(this);
    }

    checkDataChanged(first: boolean) {
        const action: Action = this.getApplet().action;
        const params = action.parameters.find((parameters) => parameters['name'] === 'login_link');
        EpitechService.getNotifications(params['value'], (success, error) => {
            if (error)
                return Logger.e(error);

            success.forEach((notification) => {
                const existData = this.data.find((notif) => notif === notification['id']);
                if (existData === undefined) {
                    this.data.push(notification['id']);
                    this.onDataChanged(first, notification);
                }
            })
        });
    }

    onDataChanged(first, notification) {
        if (first) {
            console.log("fill json data array");
            this.data.push(notification['id']);
        } else {
            new AppletController().callReactions(this.getApplet(), ingredientsHook(notification, ActionType.intra_new_notifications), (error) => {
                if (error)
                    console.log(error);
            })
        }
    }
}
