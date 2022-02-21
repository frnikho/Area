import React from "react";
import PropTypes from "prop-types";
import {
    Alert,
    Box, ButtonBase, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent, FormControl,
    IconButton, InputLabel, MenuItem, Paper, Select,
    Typography
} from "@mui/material";
import {MdClose} from "react-icons/md";
import app, {config} from "../../Utils/Axios";
import {AuthContext} from "../../Contexts/AuthContext";
import {Navigate} from "react-router-dom";

export class ActionSettingsDialog extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            contexts: undefined,
            redirect: undefined,
            selectedContextUuid: undefined
        }
    }

    componentDidMount() {
        app.get(`context/all?service=${this.props.service.type}`, config(this.context.getToken())).then((response) => {
            this.setState({
                contexts: response.data,
                selectedContextUuid: response.data[0].uuid
            })
        });
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
                {this.state.redirect !== undefined ? <Navigate to={this.state.redirect}/> : null}
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

ActionSettingsDialog.propTypes = {
    action: PropTypes.object.isRequired,
    service: PropTypes.object.isRequired,
    onClose: PropTypes.func
}
