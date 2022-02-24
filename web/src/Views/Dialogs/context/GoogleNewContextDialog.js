import React from "react";
import NewContextDialog from "./NewContextDialog";
import PropTypes from "prop-types";
import {Box, Button} from "@mui/material";
import app, {config} from "../../../Utils/Axios";
import {AuthContext} from "../../../Contexts/AuthContext";
import OauthPopup from "react-oauth-popup";
import {FaGoogle} from "react-icons/fa";
import {withSnackbar} from "notistack";

class GoogleNewContextDialog extends NewContextDialog {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            url: undefined,
            valid: false,
            tokenData: undefined,
        }
        this.onPopupSuccess = this.onPopupSuccess.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
    }

    componentDidMount() {
        app.get('/services/google/link').then((response) => {
            console.log(response.data);
            this.setState({
                url: response.data.url,
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    onPopupSuccess(code) {
        const auth = this.context;
        app.get(`services/google/callback?code=${code}`, config(auth.getToken())).then((response) => {
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
        if (this.state.url === undefined)
            return;
        return (<OauthPopup
            url={this.state.url}
            title={"Google login"}
            onClose={this.onPopupClose}
            onCode={(code) => this.onPopupSuccess(code)}>
                <Button disabled={this.state.tokenData !== undefined} endIcon={<FaGoogle/>}>Login to google</Button>
        </OauthPopup>)
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

export default withSnackbar(GoogleNewContextDialog);
