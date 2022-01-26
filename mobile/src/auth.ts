import app, {config} from "./axios_config";
import {getData, removeData} from "./async_storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const is_logged_in = (callback: (valid: boolean) => void):void => {
    AsyncStorage.getItem('@token').then((value: any) => {
        app.get("/me", config(value)).then((res: any) => {
            if (res.status === 200) {
                callback(true);
            }
        }).catch(async(err: any) => {
            console.log(err)
            callback(false);
        })
    })
}
