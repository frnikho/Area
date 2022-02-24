import React from "react";
import NewContextDialog from "./NewContextDialog";
import PropTypes from "prop-types";
import OAuth2Login from "react-simple-oauth2-login";
import {Box, Button} from "@mui/material";
import {FaGithub, FaGoogle} from "react-icons/fa";
import app, {config} from "../../../Utils/Axios";
import {AuthContext} from "../../../Contexts/AuthContext";
import GoogleLogin from "react-google-login";

export default class GoogleNewContextDialog extends NewContextDialog {

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
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                redirectUri={process.env.REACT_APP_GOOGLE_REDIRECT_URL}
                scope={"https://mail.google.com/"}
                render={renderProps => (
                    <Button onClick={renderProps.onClick} disabled={this.state.tokenData !== undefined} endIcon={<FaGoogle/>}>Login to google</Button>
                )}
                onSuccess={(response) => console.log(response)}
                accessType={"offline"}
                onFailure={(error => console.error(error))}
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

GoogleNewContextDialog.propTypes = {
    service: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
}
