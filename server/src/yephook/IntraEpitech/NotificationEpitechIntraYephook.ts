import IntraYephook from "./IntraYephook";

const REFRESH_TIME : number = 5;

export default class NotificationEpitechIntraYephook extends IntraYephook {

    private readonly _onDataChanged: any;

    constructor(email: string, authLink: string, onDataChanged: any) {
        super(REFRESH_TIME, email, `${authLink}`, "?format=json", "history.{key}.id");
        this._onDataChanged = onDataChanged;
    }

    onDataChanged(oldData, responseData): void {
        console.log("data changed !")
        this._onDataChanged(oldData, responseData);
    }

    onDataNotChanged(data) {
        console.log("not news notification");
    }

}
