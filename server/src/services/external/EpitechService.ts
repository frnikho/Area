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

}
