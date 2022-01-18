import React from "react";
import OAuth2Login from 'react-simple-oauth2-login';
import app from "../../utils/Axios";

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onResumeGithubLogin = this.onResumeGithubLogin.bind(this);
    }

    onClickLogin() {
        app.get('/auth/github').then((response) => {
            console.log(response);
        })
    }

    onResumeGithubLogin(data) {
        app.post(`/auth/github/code`, {
            code: data['code']
        }).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err.response);
        });
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
            <div>
                {this.showLoginPopup()}
                <label>
                    Email
                    <input type="text" onChange={this.handleEmailChange} />
                </label>
                <label>
                    Password
                    <input type="text" onChange={this.handlePasswordChange} />
                </label>

                <button onClick={this.onClickLogin}>Login</button>

            </div>
        );
    }

}
