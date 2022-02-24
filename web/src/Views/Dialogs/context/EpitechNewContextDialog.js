import React from "react";
import NewContextDialog from "./NewContextDialog";
import {Box, Button, IconButton, TextField, Tooltip, Typography} from "@mui/material";
import {FaCheck, FaQuestion} from "react-icons/fa";
import app, {config} from "../../../Utils/Axios";
import {AuthContext} from "../../../Contexts/AuthContext";
import {withSnackbar} from "notistack";

class EpitechNewContextDialog extends NewContextDialog {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            epitechUrl: '',
            verified: false,
        }
        this.openEpitechLink = this.openEpitechLink.bind(this);
        this.verify = this.verify.bind(this);
    }

    openEpitechLink() {
        window.open('https://intra.epitech.eu/admin/autolog');
    }

    renderContextLogin() {
        return (
            <Box>
                <Typography fontSize={20} fontWeight={"500"} fontFamily={"Roboto"}>
                    Auto login link
                    <Tooltip title="Click here to get your epitech auto login link">
                        <IconButton onClick={this.openEpitechLink} size={"small"}>
                            <FaQuestion />
                        </IconButton>
                    </Tooltip>
                </Typography>
                <Box sx={{mb: 2}} justifyItems={"center"} justifyContent={"center"}>
                    <TextField value={this.state.epitechUrl} onChange={(event) => this.setState({epitechUrl: event.target.value})}/>
                </Box>
                <Button disabled={this.state.verified === true} variant={"contained"} onClick={this.verify}>{!this.state.verified ? "Verify" : <FaCheck/>}</Button>
            </Box>
        )
    }

    renderCreateButton(valid, fnc) {
        return (<Button variant={"contained"} disabled={this.state.verified === false} onClick={() => this.onClickCreate(this.state.tokenData, this.props.onCreate)}>
            Create
        </Button>)
    }

    verify() {
        app.get(`services/epitech/callback?url=${this.state.epitechUrl}`, config(this.context.getToken())).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                this.setState({
                    verified: true,
                    tokenData: response.data,
                })
            }
        }).catch((err) => {
            console.log(err.response.data);
        })
    }

}

EpitechNewContextDialog.propTypes = {

}

export default withSnackbar(EpitechNewContextDialog);
