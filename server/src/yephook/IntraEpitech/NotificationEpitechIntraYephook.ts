import IntraYephook from "./IntraYephook";

const REFRESH_TIME : number= 30;

export default class NotificationEpitechIntraYephook extends IntraYephook {

    constructor(user: object) {
        super(REFRESH_TIME, user['email'], "https://intra.epitech.eu/auth-341c9e418d2bf222930009ac94f801e76ef69f22/?format=json", "history.{key}.id");
    }

    onDataChanged(oldData, responseData): void {
        console.log("epitech new notification !");
    }

    onDataNotChanged(data) {
        console.log("not news notification");
    }

}
