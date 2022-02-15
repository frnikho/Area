import React from "react";
import PropTypes from "prop-types";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Typography
} from "@mui/material";
import {MdClose} from "react-icons/md";

export class ActionSettingsDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
        }
    }

    onClose () {
        this.props.onClose();
    }

    onCreate (data) {
        console.log("data: ", data);
    }

    validate() {
        this.setState({
            valid: false
        })
    }

    render() {
        return (
            <Dialog open={true} maxWidth={"xl"} fullWidth={true} onClose={() => this.props.onClose(true)}>
                <DialogActions sx={{height: 40}}>
                    <IconButton onClick={() => this.onClose()}><MdClose color={"black"}/></IconButton>
                </DialogActions>
                <Box textAlign={"start"} sx={{mx: 4}}>
                    <Typography fontFamily={"Roboto"} fontSize={34} fontWeight={"700"}>
                        {this.props.action.name}
                    </Typography>
                    <Typography fontFamily={"Roboto"} fontSize={20}>{this.props.action.description}</Typography>
                </Box>
                <DialogContent>
                    {this.renderDialogContent()}
                </DialogContent>
                <DialogActions>
                    {this.renderCreateButton()}
                </DialogActions>
            </Dialog>
        );
    }

    renderDialogContent() {
        throw new Error("renderDialogContent must be override !");
    }

    renderCreateButton() {

    }
}

ActionSettingsDialog.propTypes = {
    action: PropTypes.object.isRequired,
    service: PropTypes.object.isRequired,
    onClose: PropTypes.func
}
