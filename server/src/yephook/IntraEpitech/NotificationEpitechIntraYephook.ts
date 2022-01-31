import IntraYephook from "./IntraYephook";
import Logger from "../../utils/Logger";

const REFRESH_TIME : number = 5;

export default class NotificationEpitechIntraYephook extends IntraYephook {

    private readonly _onDataChanged: any;

    constructor(email: string, authLink: string, onDataChanged: any) {
        super(REFRESH_TIME, email, `${authLink}`, "?format=json", "history.{key}.id");
        this._onDataChanged = onDataChanged;
    }

    onDataChanged(oldData, responseData): void {
        Logger.i("Epitech notification YH", "New data available");
        this._onDataChanged(oldData, responseData);
    }

    onDataNotChanged(data) {
    }

}
