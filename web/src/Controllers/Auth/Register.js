import React from "react";
import OAuth2Login from 'react-simple-oauth2-login';
import RegisterPage from "../../Views/Auth/RegisterPage.js"

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onClickGoogleLogin = this.onClickGoogleLogin.bind(this);
        this.onClickGithubLogin = this.onClickGithubLogin.bind(this);
    }

    onClickLogin() {
        console.log("db")
        // app.get('/auth/github').then((response) => {
        //     console.log(response);
        // })
    }

    onClickGoogleLogin() {
        console.log("google")
    }

    onClickGithubLogin(data) {
        console.log("github");
        // app.post(`/auth/github/code`, {
        //     code: data['code']
        // }).then((response) => {
        //     console.log(response.data);
        // }).catch((err) => {
        //     console.log(err.response);
        // });
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    showLoginPopup() {
        return (<OAuth2Login
            authorizationUrl="https://github.com/login/oauth/authorize"
            clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
            responseType="code"
            scope={"user:email"}
            redirectUri={process.env.REACT_APP_GITHUB_REDIRECT_URL}
            onSuccess={this.onResumeGithubLogin}
            onFailure={(abc) => console.error(abc)}
            buttonText={"Github"}
        />)
    }

    render() {
        return (
            <RegisterPage {...this}/>
        )
    }

}
