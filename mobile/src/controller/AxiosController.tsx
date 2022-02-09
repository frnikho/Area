import axios from 'axios';

export default class AxiosController {

    /**
     * Base URL
     *
     * @returns
     */
    public baseURL() {
        return 'https://area-backend.nikho.dev';
    }

    /**
     * Get headers authorization
     *
     * @param token
     * @returns headers with Bearer token
     */
    public config(token: string) {
        return {
            headers: { Authorization: `Bearer ${token}` }
        };
    }

    /**
     * Get request
     *
     * @param url
     * @param headers
     * @param callback
     */
    public get(url: string, headers: object, callback: (status: boolean, response: any) => void) {
        axios.get(url, headers).then((response) => {
            return callback(true, response);
        }).catch((response) => {
            return callback(false, response);
        });
    }
}