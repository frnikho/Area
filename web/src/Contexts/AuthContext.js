import React from "react";

import app, { config } from "../utils/Axios";

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.token = undefined;
        this.user = undefined;
        this.setUser = this.setUser.bind(this);
    }

    setUser(user) {
        this.user = user
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
}

export const AuthContext = React.createContext(new Auth());
