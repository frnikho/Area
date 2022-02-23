import axios from "axios";

export default class EpitechService {

    static tryEpitechAutologinLink(link: string, callback: (success?: object, error?: string) => void) {
        axios.get(link + "/?format=json").then((response) => {
            if (response.data.ip === undefined)
                return callback(undefined, "Invalid epitech link");
            return callback(response.data);
        }).catch((err) => {
            return callback(undefined, err);
        });
    }

    public static getUser(link: string, callback: (success?: object, error?: string) => void) {
        axios.get(link + "/user/?format=json").then((response) => {
            if (response.status === 200)
                return callback(response.data);
            return callback(undefined, "");
        }).catch((err) => {
            callback(undefined, err);
        })
    }

    public static getNotifications(link: string, callback: (success?, error?: string) => void) {
        axios.get(`${link}/user/notification/message?format=json`).then((response) => {
            if (response.status === 200)
                return callback(response.data);
            return callback(undefined, "");
        }).catch((err) => {
            callback(undefined, err);
        })
    }

}
