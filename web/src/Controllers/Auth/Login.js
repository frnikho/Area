import React from "react";
import LoginPage from "../../Views/Auth/LoginPage.js"

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

        this.loginDb(email, password);
    }

    setNotification(value) {
        this.setState({ notification: value });
    }

    onClickGoogleLogin() {
        console.log("google")
    }

    onClickGithubLogin(data) {
        console.log("github");
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
