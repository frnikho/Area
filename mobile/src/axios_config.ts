import axios from "axios";
import { BACKEND_URL } from "@env";

const baseURL = BACKEND_URL;

const app = axios.create({
    baseURL: baseURL,
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