import AsyncStorage from '@react-native-async-storage/async-storage';

export default class TokenController {

    /**
     * Get user token contains in device storage
     *
     * @returns user's token
     */
    public getUserToken(callback: (status: boolean, response: any) => void) {
        AsyncStorage.getItem('@token').then((token) => {
            return callback(true, token);
        }).catch((err) => {
            return callback(false, err);
        });
    }

    /**
     * Remove user's token from storage
     *
     * @param callback - true success / false error
     */
    public removeUserToken(callback: (status: boolean, response: string) => void) {
        AsyncStorage.removeItem('@token').then(() => {
            return callback(true, "User's Token remove from storage");
        }).catch((err) => {
            return callback(false, err);
        });
    }
}