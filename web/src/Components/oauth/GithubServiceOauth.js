import React from "react";
import PropTypes from "prop-types";
import OAuth2Login from "react-simple-oauth2-login";
import {Button} from "@mui/material";
import app, {config} from "../utils/Axios";
import {AuthContext} from "../../Contexts/AuthContext";

export default class GithubServiceOauth extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.onPopupSuccess = this.onPopupSuccess.bind(this);
    }

    onPopupSuccess(data) {
        console.log(data.code);
        app.get(`${this.props.tokenUrl}?code=${data.code}`, config(this.context.getToken())).then((response) => {
            if (response.data.success === false) {
                console.log("error !");
            } else {
                this.props.onSuccess(response.data.token);
            }
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <OAuth2Login
            authorizationUrl="https://github.com/login/oauth/authorize"
            clientId={process.env.REACT_APP_GITHUB_SERVICES_CLIENT_ID}
            responseType="code"
            redirectUri={process.env.REACT_APP_GITHUB_REDIRECT_URL}
            scope={"repo%20admin:repo_hook"}
            onSuccess={this.onPopupSuccess}
            onFailure={() => this.props.onFailed}
            render={renderProps => (
                <Button variant={"outlined"} disabled={this.props.valid} endIcon={this.props.icon} onClick={renderProps.onClick}>{!this.props.valid ? "Login to github" : "Logged !"}</Button>
            )}
        />)
    }
}

GithubServiceOauth.propTypes = {
    icon: PropTypes.element.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onFailed: PropTypes.func,
    tokenUrl: PropTypes.string.isRequired,
    valid: PropTypes.bool,
}
