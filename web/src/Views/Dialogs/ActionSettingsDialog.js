import React from "react";
import PropTypes from "prop-types";
import {
    Alert,
    Box, Button, ButtonBase, CircularProgress, Collapse,
    Dialog,
    DialogActions,
    DialogContent, Divider, FormControl, Grid, Grow,
    IconButton, MenuItem, Select, Slide,
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
            <Box textAlign={"start"}>
                <Grid item xs={3} sx={{margin: "auto"}}>
                    <Typography sx={{mt: 2, mb: 2}} fontSize={20} fontWeight={"500"} fontFamily={"Roboto"} color={"white"}>Context</Typography>
                    <Select
                        style={{borderRadius: "18px", borderColor: "white", backgroundColor: "white"}}
                        sx={{width: "100%", margin: "auto"}}
                        fullWidth={true}
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
                </Grid>
            </Box>
        )
    }

    render() {
        return (
            <Dialog open={true} maxWidth={"xl"} fullWidth={true} fullScreen={true} onClose={() => this.props.onClose(true)} PaperProps={{style: {backgroundColor: this.props.service.color}}}>
                {this.state.redirect !== undefined ? <Navigate to={this.state.redirect}/> : null}
                <Grid container sx={{p: 2}}>
                    <Grid item xs={2} textAlign={"start"}>Help</Grid>
                    <Grid item xs={8} textAlign={"center"}>
                        <Typography fontSize={44} color={"white"} fontFamily={"Roboto"} fontWeight={"700"}>{this.props.service.name} Action settings</Typography>
                    </Grid>
                    <Grid item xs={2} textAlign={"end"}><IconButton onClick={() => this.onClose()}><MdClose color={"white"} fontSize={44}/></IconButton></Grid>
                </Grid>
                <Divider color={this.props.service.color} sx={{opacity: "80%"}}/>
                <Box textAlign={"center"} sx={{mt: 10}}>
                    <img width={160} src={`https://localhost:8080/static/` + this.props.service.icon}/>
                    <Typography sx={{mt: 4}} fontFamily={"Roboto"} fontSize={44} fontWeight={"700"} color={"white"}>
                        {this.props.action.name}
                    </Typography>
                    <Typography fontFamily={"Roboto"} fontSize={20} color={"white"}>{this.props.action.description}</Typography>
                </Box>
                <DialogContent>
                    {this.showContexts()}
                    {this.renderDialogContent()}
                    <Box textAlign={"center"} sx={{mt: 10}}>
                        {this.renderCreateButton()}
                    </Box>
                </DialogContent>
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
