import React from "react";
import {
    Box,
    ButtonBase,
    Container,
    Paper,
    ThemeProvider,
    Typography,
    CssBaseline,
    TextField,
    Button, Grid, Card, CardHeader, IconButton, CardContent, CardActions
} from "@mui/material";
import { styles } from "../../Resources/Styles/AddAppletPageStyles";
import { theme } from "../../Resources/Styles/AppTheme";
import ActionDialog from "../Dialogs/ActionDialog";
import ReactionDialog from "../Dialogs/ReactionDialog";
import HelpDialog from "../Dialogs/HelpDialog";
import AddIcon from '@mui/icons-material/Add';
import Page from "../Page"
import { FaPlus, FaTrash } from "react-icons/fa";
import app, { config } from "../../Utils/Axios";
import { AuthContext } from "../../Contexts/AuthContext";
import { withSnackbar } from "notistack";

/**
 * @class AddAppletPage
 * Page for create an applets
 */
class AddAppletPage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            appletTitle: 'New applet',
            action: undefined,
            reactions: [],
            currentDialog: undefined,
            redirect: undefined,
        }
        this.onActionSelected = this.onActionSelected.bind(this);
        this.onReactionSelected = this.onReactionSelected.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onClickAddReaction = this.onClickAddReaction.bind(this);
        this.onClickAddAction = this.onClickAddAction.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
        this.renderAddAppletPage = this.renderAddAppletPage.bind(this)
    }

    onActionSelected(action, actionAbout, serviceAbout) {
        console.log(action, actionAbout, serviceAbout);
        this.setState({
            action: {
                data: action,
                about: actionAbout,
                service: serviceAbout,
            },
        })
    }

    onReactionSelected(reaction, about, service) {
        const reactions = this.state.reactions;
        reactions.push({
            reaction,
            about,
            service,
        });
        this.setState({ reactions });
    }

    onClose() {
        this.setRedirectUrl({ url: '/' })
    }

    onClickHelp() {
        this.setState({
            currentDialog: "HELP_DIALOG"
        })
    }

    onClickAddAction() {
        this.setState({
            currentDialog: "ACTION_DIALOG",
        })
    }

    onClickAddReaction() {
        this.setState({
            currentDialog: "REACTION_DIALOG",
        })
    }

    onCloseDialog() {
        this.setState({
            currentDialog: undefined,
        })
    }

    showDialogs() {
        const Dialogs = {
            ACTION_DIALOG: <ActionDialog onSelected={this.onActionSelected} onClose={this.onCloseDialog} />,
            REACTION_DIALOG: <ReactionDialog action={this.state.action} onSelected={this.onReactionSelected} onClose={this.onCloseDialog} />,
            HELP_DIALOG: <HelpDialog onClose={this.onCloseDialog} />,
            undefined: null
        }
        return (
            Dialogs[this.state.currentDialog]
        )
    }

    showActionButton() {
        if (this.state.action === undefined) {
            return (
                <Paper sx={{ backgroundColor: "#222222", mb: 4, mt: 1, borderRadius: 8 }}>
                    <ButtonBase sx={{ borderRadius: 8 }} centerRipple={true} onClick={this.onClickAddAction}>
                        <Box sx={{ width: 600, p: 3, borderRadius: 8 }}>
                            <Typography variant={"h1"} fontFamily={""} fontWeight={"700"} color={"white"}>If This<AddIcon size={40} /></Typography>
                        </Box>
                    </ButtonBase>
                </Paper>
            )
        } else {
            return (
                <Grid item xs={8} sx={{ my: 2, width: "100%" }}>
                    <Card sx={{ backgroundColor: this.state.action.service.color, borderRadius: 8 }}>
                        <CardHeader action={<IconButton onClick={() => this.setState({ action: undefined, reactions: [] })} ><FaTrash color={"white"} /> </IconButton>} />
                        <CardContent>
                            <Typography variant={"h3"} fontFamily={"Roboto"} fontWeight={"700"} color={"white"}>IF</Typography>
                            <Typography variant={"h4"} fontFamily={"Roboto"} fontWeight={"700"} color={"white"}>{this.state.action.about.name}</Typography>
                            <img src={`https://localhost:8080/static/` + this.state.action.service.icon} width={50} alt="Loading . . ." />
                        </CardContent>
                        <CardActions />
                    </Card>
                </Grid>
            )
        }
    }

    showReactionButton() {
        if (this.state.reactions.length === 0) {
            return (<Paper sx={{ backgroundColor: "#999999", borderRadius: 8 }}>
                <ButtonBase disabled={this.state.action === undefined} sx={{ borderRadius: 8 }} centerRipple={true} onClick={this.onClickAddReaction}>
                    <Box sx={{ width: 600, p: 3, borderRadius: 8 }}>
                        <Typography variant={"h1"} fontFamily={""} fontWeight={"700"} color={"white"}>Then that <AddIcon size={40} /></Typography>
                    </Box>
                </ButtonBase>
            </Paper>)
        } else {
            return (
                this.state.reactions.map((reaction, index) => {
                    return (
                        <Grid item key={index} xs={8} sx={{ my: 2, width: "100%" }}>
                            <Card sx={{ backgroundColor: reaction.service.color, borderRadius: 8 }}>
                                <CardHeader action={<IconButton onClick={() => this.setState({ action: undefined, reactions: [] })} ><FaTrash color={"white"} /> </IconButton>} />
                                <CardContent>
                                    <img src={`https://localhost:8080/static/` + reaction.service.icon} width={50} alt="Loarding . . ." />
                                    <Typography variant={"h4"} fontFamily={"Roboto"} fontWeight={"700"} color={"white"}>{reaction.about.name}</Typography>
                                </CardContent>
                                <CardActions />
                            </Card>
                        </Grid>
                    )
                })
            )
        }
    }

    showCreateButton() {
        return (<Box sx={{ mt: 8 }}>
            <Button variant={"contained"} disabled={this.state.action === undefined || this.state.reactions.length === 0} sx={{ width: 300, p: 2 }} onClick={this.onClickCreate}>Create</Button>
        </Box>);
    }

    showAddMoreReactionButton() {
        if (this.state.reactions.length === 0)
            return;
        return (<ButtonBase>
            <FaPlus onClick={this.onClickAddReaction} />
        </ButtonBase>)
    }

    onClickCreate() {
        console.log(this.state.action);

        const body = {
            title: this.state.appletTitle,
            action_key: this.state.action.data.base_key,
            action_type: this.state.action.data.action_type,
            action: {
                parameters: this.state.action.data.action.parameters,
            },
            reactions: this.state.reactions.map((reaction) => reaction.reaction),
        }
        console.log(body);
        app.post('/applets', body, config(this.context.getToken())).then((response) => {
            console.log(response.data);
            this.props.enqueueSnackbar('New applet created successfully', {
                variant: 'success',
                onClose: () => { this.setState({ redirect: '/' }) },
            });
        }).catch((err) => {
            this.props.enqueueSnackbar(`${err.message}`, {
                variant: 'error'
            });
            console.log(err.response.data);
        })
    }

    onChangeTitle(event) {
        this.setState({ appletTitle: event.target.value })
    }

    showTitle() {
        return (
            <Box sx={{ mt: 8 }} style={styles.topBar.centerMenu}>
                <TextField name={"Applet's title"} label={"Applet's title"} inputProps={{ style: { fontSize: 30 } }} variant="filled" value={this.state.appletTitle} onChange={this.onChangeTitle} />
            </Box>
        )
    }

    renderAddAppletPage() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {this.showDialogs()}
                {this.showTitle()}
                <Box style={styles.content}>
                    <Container>
                        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: "center" }}>
                            {this.showActionButton()}
                            {this.showReactionButton()}
                            {this.showAddMoreReactionButton()}
                            {this.showCreateButton()}
                        </Box>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }

    render() {
        return(this.pageRender(this.renderAddAppletPage))
    }
}

export default withSnackbar(AddAppletPage);
