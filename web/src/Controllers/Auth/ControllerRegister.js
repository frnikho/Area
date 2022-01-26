import React from "react";
import OAuth2Login from 'react-simple-oauth2-login';
import RegisterPage from "../../Views/Auth/RegisterPage.js"
import Github from "../../Models/Auth/Github.js"
import Google from "../../Models/Auth/Google.js"
import { AuthContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";


export default class ControllerRegister extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: undefined,
            notification: undefined,
        }

        this.cookies = props;
        this.handleSubmit = this.handleSubmit.bind(this)
        this.registerDb = this.registerDb.bind(this)
        this.onClickGoogleLogin = this.onClickGoogleLogin.bind(this);
        this.onClickGithubLogin = this.onClickGithubLogin.bind(this);
        this.setNotification = this.setNotification.bind(this)
        this.setRedirectUrl = this.setRedirectUrl.bind(this)
    }

    setRedirectUrl(url) {
        this.setState({ redirectUrl: url})
    }

    componentDidMount() {
        this.auth = this.context;
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

    registerDb(username, email, password) {
        this.auth.register({ username: username, email: email, password: password }, () => {
            this.setState({
                redirectUrl: '/auth/login',
            });
        }, (err) => {
            console.log(err);
            console.log("Error !");
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.has('username') || data.get('username') === "")
            return this.setNotification({ message: "Username cannot be empty !", show: true, type: "error" });
        if (!data.has('email') || data.get('email') === "")
            return this.setNotification({ message: "Email cannot be empty !", show: true, type: "error" });
        if (!data.has('password') || data.get('password') === "")
            return this.setNotification({ message: "Password cannot be empty !", show: true, type: "error" });
        if (!data.has('confpassword') || data.get('confpassword') === "" || data.get('confpassword') !== data.get('password'))
            return this.setNotification({ message: "Passwords are not the same !", show: true, type: "error" });
        this.registerDb(data.get('username'), data.get('email'), data.get('password'));
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

    render() {
        return (
            <>
                <RegisterPage {...this} />
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl} /> : null}
            </>
        )
    }

}