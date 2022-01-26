import React from "react";

import app, {config} from "../Components/utils/Axios";

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.token = undefined;
        this.user = undefined;
        this.loginFromWeb = this.loginFromWeb.bind(this);
    }

    getUser = () => {
        return this.user;
    }

    getToken = () => {
        return this.token;
    }

    loginFromCache = (token, onSuccess, onError) => {
        app.get(`/me`, config(token)).then((response) => {
            this.token = token;
            this.user = response.data;
            onSuccess(response.data);
        }).catch(onError)
    }

    loginFromWeb = ({email, password}, onSuccess, onError) => {
        app.post(`/auth/login`, {
            email: email,
            password: password,
        }).then((response) => {
            let data = response.data;
            if (data.success === true) {
                app.get(`/me`, config(data.token)).then((response) => {
                    this.token = data.token;
                    this.user = response.data;
                    onSuccess(data.token);
                }).catch(onError)
            } else {
                onError(data);
            }
        }).catch((err) => {
            if (err.response === undefined)
                onError(err);
            else
                onError(err.response);
        })
    }

    register = ({email, firstname, lastname, password}, onSuccess, onError) => {
        app.post(`/auth/register`, {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        }).then((response) => {
            let data = response.data;
            if (data.success === true) {
                onSuccess(data.token);
            } else {
                onError(data);
            }
        }).catch((err) => {
            if (err.response === undefined)
                onError(err);
            else
                onError(err.response);
        })

    }


}

export const AuthContext = React.createContext(new Auth());
