import React from "react";
import LoginPage from "../../Views/Auth/LoginPage.js"
// import Database from "../../Models/Auth/DataBase"

import Controller from "../Controller"
import Github from "../../Models/Auth/Github.js"
import Google from "../../Models/Auth/Google.js"
import { AuthContext } from "../../Contexts/AuthContext";
import { withCookies } from "react-cookie";

class ControllerLogin extends Controller {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.cookies = props;
        this.handleSubmit = this.handleSubmit.bind(this)
        this.loginDb = this.loginDb.bind(this)
        this.onClickGoogleLogin = this.onClickGoogleLogin.bind(this);
        this.onClickGithubLogin = this.onClickGithubLogin.bind(this);
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() !== undefined) {
            this.setRedirectUrl('/area/dashboard')
        }
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

    onClickGoogleLogin(response) {
        if (response.error) {
            // temporay
            if (response.error !== "idpiframe_initialization_failed")
                this.setNotification({ message: "Error with google", show: true, type: "error" });
        } else {
            Google.connect(response);
        }
    }

    onClickGithubLogin(response) {
        if (response.error) {
            // temporay
            if (response.error !== "idpiframe_initialization_failed")
                this.setNotification({ message: "Error with google", show: true, type: "error" });
        } else {
            Github.connect(response);
        }
    }

    loginDb(email, password) {
        const { cookies } = this.props;
        this.authContext.loginFromWeb({ email: email, password: password }, (token) => {
            console.log("Success !");
            cookies.set('session', token, { path: '/' });
            this.setRedirectUrl('/')
        }, (err) => {
            console.log(err);
            console.log("Error !");
        });
    }

    render() {
        return (
            <div>
                <LoginPage {...this} />
                {this.redirectUrl()}
            </div>
        );
    }

}

export default withCookies(ControllerLogin);
