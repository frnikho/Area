import IntraYephook from "./IntraYephook";

const REFRESH_TIME : number= 30;

export default class NotificationEpitechIntraYephook extends IntraYephook {

    constructor(user: object) {
        super(REFRESH_TIME, user['email'], `${process.env.EPITECH_AUTH_LINK}/?format=json`, "history.{key}.id");
    }

    onDataChanged(oldData, responseData): void {
        console.log("epitech new notification !");
    }

    onDataNotChanged(data) {
        console.log("not news notification");
    }

}
