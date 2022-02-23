import axios from 'axios';

const DEFAULT_BASE_URL = "https://area-backend.nikho.dev";

export default class AxiosController {

    /**
     * Base URL
     *
     * @returns
     */
    public baseURL() {
        return process.env.BASE_URL || DEFAULT_BASE_URL;
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
        }).catch((err) => {
            return callback(false, err);
        });
    }

    /**
     * Delete request
     *
     * @param url
     * @param headers
     * @param callback
     */
    public del(url: string, headers: object, callback: (status: boolean, response: any) => void) {
        axios.delete(url, headers).then((response) => {
            return callback(true, response);
        }).catch((err) => {
            return callback(false, err);
        });
    }

    /**
     * Post request
     *
     * @param url
     * @param headers
     * @param callback
     */
     public post(url: string, headers: object, callback: (status: boolean, response: any) => void) {
        axios.post(url, headers).then((response) => {
            return callback(true, response);
        }).catch((err) => {
            return callback(false, err);
        });
    }
}