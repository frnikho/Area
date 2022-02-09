import axios from "axios";
import { BACKEND_URL } from "@env";

const baseURL = `https://nikho.dev:8080`;

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
