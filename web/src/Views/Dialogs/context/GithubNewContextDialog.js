import React from "react";
import NewContextDialog from "./NewContextDialog";
import PropTypes from "prop-types";
import OAuth2Login from "react-simple-oauth2-login";
import {Box, Button} from "@mui/material";
import {FaGithub} from "react-icons/fa";
import app, {config} from "../../../Utils/Axios";
import {AuthContext} from "../../../Contexts/AuthContext";

export default class GithubNewContextDialog extends NewContextDialog {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            tokenData: undefined,
        }
        this.onPopupSuccess = this.onPopupSuccess.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
    }

    onPopupSuccess(data) {
        const auth = this.context;
        app.get(`services/github/callback?code=${data.code}`, config(auth.getToken())).then((response) => {
            this.setState({
                tokenData: response.data.token,
                valid: true,
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    onPopupClose() {
        console.log("close");
    }

    renderContextLogin(valid) {
        return (
            <OAuth2Login
                authorizationUrl="https://github.com/login/oauth/authorize"
                clientId={process.env.REACT_APP_GITHUB_SERVICES_CLIENT_ID}
                responseType="code"
                redirectUri={process.env.REACT_APP_GITHUB_REDIRECT_URL}
                scope={"repo%20admin:repo_hook"}
                onSuccess={this.onPopupSuccess}
                onFailure={() => this.onPopupClose}
                render={renderProps => (
                    <Button variant={"outlined"} disabled={this.state.valid} endIcon={<FaGithub/>} onClick={renderProps.onClick}>{!this.state.valid ? "Login to github" : "Logged !"}</Button>
                )}
            />);
    }

    renderCreateButton(valid) {
        return (
            <Box>
                <Button disabled={this.state.tokenData === undefined} fullWidth variant={"contained"} onClick={() => this.onClickCreate(this.state.tokenData, this.props.onCreate)}>Create {this.props.service.name} context</Button>
            </Box>
        )
    }

}

GithubNewContextDialog.propTypes = {
    service: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
}
