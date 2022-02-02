// import React from "react";
import LoginPage from "../../Views/Auth/LoginPage.js"
import ControllerDataBase from "../Api/ControllerDataBase"

import Controller from "../Controller"
import ControllerGithub from "../Api/ControllerGithub.js"
import ControllerGoogle from "../Api/ControllerGoogle.js"
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

    componentWillMount() {
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
            this.setNotification({ message: "Error with google", show: true, type: "error" });
        } else {
            ControllerGoogle.connect(response);
        }
    }

    onClickGithubLogin(response) {
        if (response.error) {
            this.setNotification({ message: "Error with google", show: true, type: "error" });
        } else {
            ControllerGithub.connect(response);
        }
    }

    loginDb(email, password) {
        ControllerDataBase.connect(email, password, (data) => {
            if (data.success === true) {
                this.authContext.loginFromCache((data.token), () => {
                    const { cookies } = this.props;

                    cookies.set('session', data.token, { path: '/' });
                    this.setRedirectUrl('/')
                })
            } else {
                this.setNotification({ message: "Error with ControllerDataBase", show: true, type: "error" });
            }
        }, (error) => {
            this.setNotification({ message: error.data.error, show: true, type: "error" });
        })

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
