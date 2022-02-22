import React from "react";
import {
    Box,
    CircularProgress,
    Dialog,
    DialogContent,
    Grid,
    List,
    Typography
} from "@mui/material";
import AppletChildItemCard from "../../Components/AppletChildItemCard";
import GithubRepositoryDeletedDialog from "./github/actions/GithubRepositoryDeletedDialog";
import GithubNewPushRepositoryDialog from "./github/actions/GithubNewPushRepositoryDialog";
import PropTypes from "prop-types";
import GithubReleaseCreatedDialog from "./github/actions/GithubReleaseCreatedDialog";
import GithubIssueOpenedDialog from "./github/actions/GithubIssueOpenedDialog";
import GithubIssueClosedDialog from "./github/actions/GithubIssueClosedDialog";
import GithubIssueReopenedDialog from "./github/actions/GithubIssueReopenedDialog";
import GithubRepositoryCreatedDialog from "./github/actions/GithubRepositoryCreatedDialog";
import app from "../../Utils/Axios";
import DiscordChannelCreatedDialog from "./discord/actions/DiscordChannelCreatedDialog";

export default class ActionDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            services: undefined,
            action: undefined,
            service: undefined,
            dialog: undefined,
        }
        this.onDialogsClosed = this.onDialogsClosed.bind(this);
        this.onActionCreated = this.onActionCreated.bind(this);
    }

    componentDidMount() {
        app.get('/about.json').then((response) => {
            this.setState({
                services: response.data.server.services
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    onClickAction(action, service) {
        console.log(action.type.toUpperCase());
        this.setState({
            dialog: action.type.toUpperCase(),
            action: action,
            service: service
        })
    }

    showActions() {
        if (this.state.services === undefined)
            return (<Box m={10} alignContent={"center"} textAlign={"center"}><CircularProgress /></Box>);
        return (
            <List>
                {this.state.services.map((service, indexS) => {
                    if (service.actions.length === 0)
                        return null;
                    return (
                        <Box key={indexS}>
                            <Box textAlign={"start"} sx={{ my: 2, display: "flex", alignItems: "center", justifyContent: "start" }}>
                                <Typography fontFamily={"Roboto"} fontWeight={"700"} fontSize={46} sx={{ mx: 2 }}>
                                    {service.name}
                                </Typography>
                                <img src={`https://localhost:8080/static/${service.icon}`} width={58} alt="Loading . . ." />
                            </Box>
                            <div>
                                <Grid container spacing={2} direction="row" justifyContent="center">
                                    {service.actions.map((action, indexA) => {
                                        return (
                                            <Grid item key={indexA}>
                                                <AppletChildItemCard title={action.name} description={action.description} color={service.color} onClick={() => this.onClickAction(action, service)} />
                                            </Grid>)
                                    })}
                                </Grid>
                            </div>
                        </Box>
                    );
                })}
            </List>)
    }

    onDialogsClosed(onlyDialog) {
        if (onlyDialog) {
            this.setState({ dialog: undefined });
        } else {
            this.setState({ dialog: undefined });
            this.props.onClose();
        }
    }

    onActionCreated(data) {
        this.onDialogsClosed(false);
        this.props.onSelected(data, this.state.action, this.state.service);
    }

    showDialogs() {
        if (this.state.dialog === undefined)
            return;

        const data = {
            GITHUB_REPOSITORY_DELETED: <GithubRepositoryDeletedDialog onClose={this.onDialogsClosed} onActionCreated={this.onActionCreated} action={this.state.action} service={this.state.service} />,
            GITHUB_REPOSITORY_PUSH: <GithubNewPushRepositoryDialog onClose={this.onDialogsClosed} onActionCreated={this.onActionCreated} action={this.state.action} service={this.state.service} />,
            GITHUB_RELEASE_CREATED: <GithubReleaseCreatedDialog onClose={this.onDialogsClosed} onActionCreated={this.onActionCreated} action={this.state.action} service={this.state.service} />,
            GITHUB_ISSUE_OPENED: <GithubIssueOpenedDialog onClose={this.onDialogsClosed} onActionCreated={this.onActionCreated} action={this.state.action} service={this.state.service} />,
            GITHUB_ISSUE_CLOSED: <GithubIssueClosedDialog onClose={this.onDialogsClosed} onActionCreated={this.onActionCreated} action={this.state.action} service={this.state.service} />,
            GITHUB_ISSUE_REOPENED: <GithubIssueReopenedDialog onClose={this.onDialogsClosed} onActionCreated={this.onActionCreated} action={this.state.action} service={this.state.service} />,
            GITHUB_REPOSITORY_CREATED: <GithubRepositoryCreatedDialog onClose={this.onDialogsClosed} onActionCreated={this.onActionCreated} action={this.state.action} service={this.state.service}/>,
            DISCORD_CHANNEL_CREATED: <DiscordChannelCreatedDialog onClose={this.onDialogsClosed} onActionCreated={this.onActionCreated} action={this.state.action} service={this.state.service}/>
        }
        return data[this.state.dialog];
    }

    showMainDialog() {
        if (this.state.dialog !== undefined)
            return;
        return (
            <Dialog
                open={true}
                maxWidth={"xl"}
                fullWidth={true}
                onClose={() => this.props.onClose()}>

                {/* <DialogActions style={{backgroundColor: "black"}}>
                        <IconButton onClick={() => this.props.onClose()}><MdClose color={"white"}/></IconButton>
                    </DialogActions>

                    <img src={`https://localhost:8080/static/applets_banner.png`}/>*/}

                <DialogContent>
                    {this.showActions()}
                </DialogContent>
            </Dialog>
        )
    }

    render() {
        return (
            <div>
                {this.showMainDialog()}
                {this.showDialogs()}
            </div>
        );
    }
}

ActionDialog.propTypes = {
    onSelected: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}
