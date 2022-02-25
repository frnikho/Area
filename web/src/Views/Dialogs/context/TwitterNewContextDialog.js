import NewContextDialog from "./NewContextDialog";
import React from "react";
import app, {config} from "../../../Utils/Axios";
import {withSnackbar} from "notistack";
import {FaTwitter} from "react-icons/fa";
import OAuth2Login from "react-simple-oauth2-login";
import {Button} from "@mui/material";

class TwitterNewContextDialog extends NewContextDialog {

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            pkceKey: undefined,
            twitterUrl: undefined,
            popup: undefined,
        }
        this.onPopupSuccess = this.onPopupSuccess.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
        this.openPopupTwitter = this.openPopupTwitter.bind(this);
    }

    componentDidMount() {
        app.get('services/twitter/link', config(this.context.getToken())).then((response) => {
            console.log(response.data);
            this.setState({
                pkceKey: response.data.pkceKey,
                twitterUrl: response.data.link
            })
        })
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

    openPopupTwitter = (event) => {
        const width = 500;
        const height = 400;
        const left = window.screenX + (window.outerWidth - 400) / 2;
        const top = window.screenY + (window.outerHeight - 800) / 2.5;
        const title = `WINDOW TITLE`;
        const url = `${this.state.twitterUrl}`;
        const popup = window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`);
        console.log(popup);

        const timer = setInterval(() => {
            if (!popup) {
                timer && clearInterval(timer);
                return;
            }
            console.log(popup.location);
           /* if (!currentUrl) {
                return;
            }
            const searchParams = new URL(currentUrl).searchParams;
            const code = searchParams.get('code');
            if (code) {
                popup.close();
                console.log(`The popup URL has URL code param = ${code}`);
            }*/
        }, 500)
    }

    renderContextLogin() {
        if (this.state.twitterUrl === undefined)
            return;

        //return (<Button onClick={this.openPopupTwitter} variant={"outlined"} disabled={this.state.valid} endIcon={<FaTwitter/>}>{!this.state.valid ? "Login to twitter" : "Logged !"}</Button>)

        return (<OAuth2Login
            authorizationUrl={"https://twitter.com/i/oauth2/authorize"}
            clientId={process.env.REACT_APP_TWITTER_SERVICES_CLIENT_ID}
            redirectUri={process.env.REACT_APP_TWITTER_SERVICES_REDIRECT_URL}
            responseType={"code"}
            scope={"tweet.write tweet.read users.read offline.access"}
            state={"state"}
            isCrossOrigin={true}
            onRequest={(abc) => console.log(abc)}
            onSuccess={this.onPopupSuccess}
            onFailure={this.onPopupClose}
            render={renderProps => (
                <Button variant={"outlined"} disabled={this.state.valid} endIcon={<FaTwitter/>} onClick={renderProps.onClick}>{!this.state.valid ? "Login to twitter" : "Logged !"}</Button>
            )}
            extraParams={{code_challenge_method: "s256", code_challenge: "drohnroiohjrioeriohnerhgerohbrheryeryhertjhrujrtretrehrrthrthrthrthnerohero"}}
        />)
    }
}

export default withSnackbar(TwitterNewContextDialog);
