import NewContextDialog from "./NewContextDialog";
import OAuth2Login from "react-simple-oauth2-login";
import {Button} from "@mui/material";
import {FaTwitter} from "react-icons/fa";
import React from "react";
import app, {config} from "../../../Utils/Axios";

export default class TwitterNewContextDialog extends NewContextDialog {

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
        }
        this.onPopupSuccess = this.onPopupSuccess.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
    }

    onPopupSuccess(data) {
        const auth = this.context;
        app.get(`services/discord/callback?code=${data.code}&type=web`, config(auth.getToken())).then((response) => {
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

    renderContextLogin() {

        return (<OAuth2Login
            authorizationUrl={"https://twitter.com/i/oauth2/authorize"}
            clientId={process.env.REACT_APP_TWITTER_SERVICES_CLIENT_ID}
            redirectUri={process.env.REACT_APP_TWITTER_SERVICES_REDIRECT_URL}
            responseType={"code"}
            scope={"tweet.write tweet.read users.read offline.access"}
            state={"state"}
            onSuccess={this.onPopupSuccess}
            onFailure={this.onPopupClose}
            render={renderProps => (
                <Button variant={"outlined"} disabled={this.state.valid} endIcon={<FaTwitter/>} onClick={renderProps.onClick}>{!this.state.valid ? "Login to Twitter" : "Logged !"}</Button>
            )}
            extraParams={{code_challenge_method: "s256", code_challenge: ""}}
        />)
    }


}
