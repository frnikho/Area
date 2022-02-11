import axios from "axios";

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
