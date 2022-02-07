import IntraYephook from "./IntraYephook";
import Logger from "../../utils/Logger";
import axios from "axios";

const REFRESH_TIME : number = 60;

export interface NotificationData {
    email: string,
    authLink: string,
    onDataChangedCallback: (oldData: any, data: any) => void,
}

export interface UserRegistry {
    userEmail: string,
    data?
}

export default class NotificationEpitechIntraYephook {

    private users: NotificationData[] = [];
    private dataToCheck: string;

    constructor(email: string, authLink: string, onDataChanged: any) {
        // super(REFRESH_TIME, email, `${authLink}`, "?format=json", "");
        this.dataToCheck = "history.{key}.id"
    }

    public addUser(data: NotificationData): boolean {
        if (this.hasUser(data.email))
            return false;
        this.users.push(data);
    }

    public hasUser(email: string): boolean {
        return this.users.filter((user) => user.email === email).length >= 1;
    }

    public removeUser(email: string): void {
        const index = this.users.findIndex((data) => data.email === email);
        this.users.splice(index, 1);
    }

    onDataChanged(oldData, responseData): void {
        Logger.i("Epitech Notification - New data available");
    }

    /*public startChecking(): void {
        this.check(true);
        this.timer = setInterval(() => this.check(false), this.checkTimeInSeconds * 1000);
    }

    private check(first) {
        axios.get(`${this.authUrl}/${this.pathUrl}`).then((response) => {
            let data = response.data[this.dataToCheck.split('.')[0]];

            this.dataToCheck.split('.').forEach((key, index) => {
                if (index === 0)
                    return;
                data = key === '{key}' ? data[0] : data[key];
            });
            if (first)
                this.registry.push({
                    userEmail: this.userEmail,
                    data
                })
            else
                this.checkDataHasChanged(data, response.data);
        }).catch((ex) => {
            console.log(ex);
        })
    }*/

}
