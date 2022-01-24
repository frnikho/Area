import React from "react";
import Model from "../Model.js"

export default class DataBase extends Model {
    constructor() {
        super();
    }

    Connect(email, password, props) {
        const { cookies } = props.props;
        this.auth.loginFromWeb({ email: email, password: password }, (token) => {
            console.log("Success !");
            cookies.set('session', token, { path: '/' });
            props.setState({
                redirectUrl: '/',
            });
        }, (err) => {
            console.log(err);
            console.log("Error !");
        });
    }

    Register(email, password, props) {
        this.auth.register({ email: email, password: password }, (token) => {
            props.setState({
                redirectUrl: '/auth/login',
            });
        }, (err) => {
            console.log(err);
            console.log("Error !");
        });
    }
}