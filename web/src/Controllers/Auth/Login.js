import React from "react";
import LoginPage from "../../Views/Auth/LoginPage.js"
// import Database from "../../Models/Auth/DataBase"

import OAuth2Login from 'react-simple-oauth2-login';
import Github from "../../Models/Auth/Github.js"
import Google from "../../Models/Auth/Google.js"
import { AuthContext } from "../../Contexts/AuthContext";
import { withCookies } from "react-cookie";
import { Navigate } from "react-router-dom";


class Login extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            notification: undefined,
            redirectUrl: undefined,
        }
        this.cookies = props;
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setNotification = this.setNotification.bind(this)
        this.loginDb = this.loginDb.bind(this)
        this.onClickGoogleLogin = this.onClickGoogleLogin.bind(this);
        this.onClickGithubLogin = this.onClickGithubLogin.bind(this);
    }

    componentDidMount() {
        this.auth = this.context;
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.has('email') || data.get('email') === "")
            return this.setNotification({ message: "Email cannot be empty !", show: true, type: "error" });
        if (!data.has('password') || data.get('password') === "")
            return this.setNotification({ message: "Password cannot be empty !", show: true, type: "error" });
        this.loginDb(data.get('email'), data.get('password'));
    }

    setNotification(value) {
        this.setState({ notification: value });
    }

    onClickGoogleLogin(response) {
        if (response.error) {
            // temporay
            if (response.error !== "idpiframe_initialization_failed")
                this.setNotification({ message: "Error with google", show: true, type: "error" });
        } else {
            Google.connect();
        }
    }

    onClickGithubLogin() {

        return (
            <OAuth2Login
                authorizationUrl="https://github.com/login/oauth/authorize"
                clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
                responseType="code"
                scope={"user:email"}
                redirectUri={process.env.REACT_APP_GITHUB_REDIRECT_URL}
                onSuccess={() => Github.connect()}
                onFailure={(abc) => console.error(abc)}
                buttonText={"Github"}
            />
        )
    }

    loginDb(email, password) {
        const { cookies } = this.props;
        this.auth.loginFromWeb({ email: email, password: password }, (token) => {
            console.log("Success !");
            cookies.set('session', token, { path: '/' });
            this.setState({
                redirectUrl: '/',
            });
        }, (err) => {
            console.log(err);
            console.log("Error !");
        });
    }

    render() {
        return (
            <>
                <LoginPage {...this} />
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl} /> : null}
            </>
        );
    }

}

export default withCookies(Login);
