import React from "react";
import LoginPage from "../../Views/Auth/LoginPage.js"
// import Database from "../../Models/Auth/DataBase"

import OAuth2Login from 'react-simple-oauth2-login';
import Github from "../../Models/Auth/Github.js"
import Google from "../../Models/Auth/Google.js"

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
            notification: undefined,
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.setNotification = this.setNotification.bind(this)

        this.loginDb = this.loginDb.bind(this)
        this.onClickGoogleLogin = this.onClickGoogleLogin.bind(this);
        this.onClickGithubLogin = this.onClickGithubLogin.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.has('email') || data.get('email') === "")
            return this.setNotification({ message: "Email cannot be empty !", show: true, type: "error" });
        if (!data.has('password') || data.get('password') === "")
            return this.setNotification({ message: "Password cannot be empty !", show: true, type: "error" });

        this.handleEmailChange(data.get('email'))
        this.handleEmailChange(data.get('password'))

        this.loginDb(data.get('email'), data.get('password'));
    }

    setNotification(value) {
        this.setState({ notification: value });
    }

    onClickGoogleLogin(response) {
        console.log("google")

        console.log(response)
        if (response.error) {
            this.setNotification({ message: "Error with google", show: true, type: "error" });
        } else {
            Google.connect();
        }
    }

    onClickGithubLogin() {
        console.log("github");

        return (
            <OAuth2Login
                authorizationUrl="https://github.com/login/oauth/authorize"
                clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
                responseType="code"
                scope={"user:email"}
                redirectUri={process.env.REACT_APP_GITHUB_REDIRECT_URL}
                onSuccess={Github.connect()}
                onFailure={(abc) => console.error(abc)}
                buttonText={"Github"}
            />
        )
    }

    loginDb() {
        console.log("db");

    }

    handleEmailChange(value) {
        this.setState({ email: value })
    }

    handlePasswordChange(value) {
        this.setState({ password: value })
    }

    render() {
        return (
            <LoginPage {...this} />
        );
    }

}
