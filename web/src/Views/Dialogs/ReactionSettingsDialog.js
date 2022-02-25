import React from "react";
import PropTypes from "prop-types";
import {
    Alert,
    Box, ButtonBase, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent, FormControl,
    IconButton, MenuItem, Select,
    Typography
} from "@mui/material";
import {MdClose} from "react-icons/md";
import app, {config} from "../../Utils/Axios";

export class ReactionSettingsDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            contexts: undefined,
            selectedContextUuid: undefined,
        }
    }

    componentDidMount() {
        app.get(`context/all?service=${this.props.service.type}`, config(this.context.getToken())).then((response) => {
            if (response.data.length === 0) {
                this.setState({
                    contexts: response.data,
                });
            } else {
                this.setState({
                    contexts: response.data,
                    selectedContextUuid: response.data[0].uuid
                })
            }
        });
    }

    onClose () {
        this.props.onClose();
    }

    onCreate (data, b) {
        console.log("data: ", data, b);
    }

    validate() {
        this.setState({
            valid: false
        })
    }

    showContexts() {
        if (this.state.contexts === undefined)
            return <CircularProgress/>
        if (this.state.contexts.length === 0) {
            return (<Alert severity="warning">
                You don't have any context for {this.props.service.name} -
                <ButtonBase onClick={() => this.setState({redirect: '/area/context'})}>
                    Click here to create a new one
                </ButtonBase>
            </Alert>)
        }
        return (
            <Box>
                <Typography sx={{mt: 2, mb: 2}} fontSize={20} fontWeight={"500"} fontFamily={"Roboto"}>Context</Typography>
                <FormControl>
                    <Select
                        variant={"outlined"}
                        value={this.state.selectedContextUuid}
                        onChange={(event) => this.setState({selectedContextUuid: event.target.value})}>
                        {this.state.contexts.map((context, index) => <MenuItem key={index} value={context.uuid}>
                            <Box>
                                <Typography fontSize={"22"}><b>{context.title}</b></Typography>
                                <Typography fontSize={"20"}>{context.description}</Typography>
                            </Box>
                        </MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
        )
    }

    render() {
        return (
            <Dialog open={true} maxWidth={"xl"} fullWidth={true} onClose={() => this.props.onClose(true)}>
                <DialogActions sx={{height: 40}}>
                    <IconButton onClick={() => this.onClose()}><MdClose color={"black"}/></IconButton>
                </DialogActions>
                <Box textAlign={"start"} sx={{mx: 4}}>
                    <Typography fontFamily={"Roboto"} fontSize={34} fontWeight={"700"}>
                        {this.props.reaction.name}
                    </Typography>
                    <Typography fontFamily={"Roboto"} fontSize={20}>{this.props.reaction.description}</Typography>
                </Box>
                <DialogContent>
                    {this.showContexts()}
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

ReactionSettingsDialog.propTypes = {
    action: PropTypes.object.isRequired,
    reaction: PropTypes.object.isRequired,
    service: PropTypes.object.isRequired,
    onClose: PropTypes.func
}
