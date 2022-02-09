import axios from "axios";
import { BACKEND_URL } from "@env";

export const baseURL = 'https://area-backend.nikho.dev';

const app = axios.create({
    baseURL: 'https://area-backend.nikho.dev',
})

export const config = (token: string) => {
    return {
        headers: {Authorization: `Bearer ${token}`}
    };
}

/*const appAuth = axios.create({
    baseURL,
    withCredentials: true,
})*/

export default app;
