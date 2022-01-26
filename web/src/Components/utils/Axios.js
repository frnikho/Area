import axios from "axios";

const baseURL = "http://146.59.236.69:8080/";

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
