import React from "react";
import RegisterPage from "../../Views/Auth/RegisterPage.js"
import Google from "../../Models/Auth/Google.js"
import Github from "../../Models/Auth/Github.js"
import DataBase from "../../Models/Auth/DataBase.js"
import { AuthContext } from "../../Contexts/AuthContext";
import Controller from "../Controller"

export default class ControllerRegister extends Controller {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.cookies = props;
        this.handleSubmit = this.handleSubmit.bind(this)
        this.registerDb = this.registerDb.bind(this)
        this.onClickGoogleLogin = this.onClickGoogleLogin.bind(this);
        this.onClickGithubLogin = this.onClickGithubLogin.bind(this);
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() !== undefined) {
            this.setRedirectUrl('/area/dashboard')
        }
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
            this.setNotification({ message: "Error with Github", show: true, type: "error" });
            console.log(response.error)
        } else {
            Github.connect()
        }
    }

    registerDb(email, firstname, lastname, password) {
        DataBase.register({ firstname: firstname, lastname: lastname, email: email, password: password }, (response) => {
            if (response.data.success === true) {
                this.setRedirectUrl('/auth/login')
                this.setNotification({ message: "Register", show: true, type: "succes" });
            } else {
                this.setNotification({ message: "error with the Database", show: true, type: "error" });
            }
        }, (err) => {
            this.setNotification({ message: err.data.error, show: true, type: "error" });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.has('firstname') || data.get('firstname') === "")
            return this.setNotification({ message: "Firstname cannot be empty !", show: true, type: "error" });
        if (!data.has('lastname') || data.get('lastname') === "")
            return this.setNotification({ message: "Lastname cannot be empty !", show: true, type: "error" });
        if (!data.has('email') || data.get('email') === "")
            return this.setNotification({ message: "Email cannot be empty !", show: true, type: "error" });
        if (!data.has('password') || data.get('password') === "")
            return this.setNotification({ message: "Password cannot be empty !", show: true, type: "error" });
        if (!data.has('confpassword') || data.get('confpassword') === "" || data.get('confpassword') !== data.get('password'))
            return this.setNotification({ message: "Passwords are not the same !", show: true, type: "error" });
        this.registerDb(data.get('email'), data.get('firstname'), data.get('lastname'), data.get('password'));
    }

    render() {
        return (
            <>
                <RegisterPage {...this} />
                {this.redirectUrl()}
            </>
        )
    }

}
