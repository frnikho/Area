import axios from "axios";

const baseURL = "https://localhost:8080/";

const app = axios.create({
    baseURL: baseURL,
})

export const config = (token) => {
    return {
        headers: {Authorization: `Bearer ${token}`}
    };
}

/*const appAuth = axios.create({
    baseURL,
    withCredentials: true,
})*/

export default app;
