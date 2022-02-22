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
    Button
} from "@mui/material";
import { styles } from "../../Resources/Styles/AddAppletPageStyles";
import { theme } from "../../Resources/Styles/AppTheme";
import ActionDialog from "../Dialogs/ActionDialog";
import ReactionDialog from "../Dialogs/ReactionDialog";
import HelpDialog from "../Dialogs/HelpDialog";
import AddIcon from '@mui/icons-material/Add';
import Page from "../Page"
import {FaPlus} from "react-icons/fa";
import app, {config} from "../../Utils/Axios";
import {AuthContext} from "../../Contexts/AuthContext";
// import Header from "../../Components/Header"

/**
 * @class AddAppletPage
 * Page for create an applets
 */
export default class AddAppletPage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            appletTitle: 'New applet',
            action: undefined,
            reactions: [],
            currentDialog: undefined,
        }
        this.onActionSelected = this.onActionSelected.bind(this);
        this.onReactionSelected = this.onReactionSelected.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onClickAddReaction = this.onClickAddReaction.bind(this);
        this.onClickAddAction = this.onClickAddAction.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
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
        this.setState({reactions});
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
                <Paper sx={{backgroundColor: "#222222", mb:4, mt: 1, borderRadius: 8}}>
                    <ButtonBase sx={{borderRadius: 8}} centerRipple={true} onClick={this.onClickAddAction}>
                        <Box sx={{width: 600, p: 3, borderRadius: 8}}>
                            <Typography variant={"h1"} fontFamily={""} fontWeight={"700"} color={"white"}>If This<AddIcon size={40}/></Typography>
                        </Box>
                    </ButtonBase>
                </Paper>
            )
        } else {
            return (
                <Paper sx={{ backgroundColor: `${this.state.action.service.color}`, mb: 4, mt: 1, borderRadius: 8 }}>
                    <ButtonBase sx={{ borderRadius: 8 }} centerRipple={true} onClick={this.onClickAddAction}>
                        <Box sx={{ width: 600, p: 3, borderRadius: 8 }}>
                            {/*                          <Box sx={{mb: 2}}>
                                <MdEditNote color={"white"} size={24}/>
                            </Box>*/}
                            <img src={`https://localhost:8080/static/` + this.state.action.service.icon} width={50} alt="Loading . . ." />
                            <Typography variant={"h4"} fontFamily={"Roboto"} fontWeight={"700"} color={"white"}>{this.state.action.about.name}</Typography>
                        </Box>
                    </ButtonBase>
                </Paper>
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
                <Box>
                    {this.state.reactions.map((reaction, index) => {
                        return (
                            <Box key={index} sx={{m: 2}}>
                                <Paper sx={{backgroundColor: reaction.service.color, borderRadius: 8}}>
                                    <ButtonBase sx={{borderRadius: 8}} centerRipple={true} onClick={this.onClickAddReaction}>
                                        <Box sx={{width: 600, p: 3, borderRadius: 8}}>
                                            <Typography fontFamily={"Roboto"} fontWeight={"700"} color={"white"}>{reaction.about.name}</Typography>
                                            <img src={`https://localhost:8080/static/` + reaction.service.icon} width={50} alt="Loarding . . ."/>
                                        </Box>
                                    </ButtonBase>
                                </Paper>
                            </Box>
                        )
                    })}
                    <ButtonBase>
                        <FaPlus onClick={this.onClickAddReaction}/>
                    </ButtonBase>
                </Box>
            )
        }
    }

    showCreateButton() {
        return (<Box sx={{my: 2}}>
            <Button variant={"contained"} disabled={this.state.action === undefined || this.state.reactions.length === 0} sx={{width: 300, p: 2}} onClick={this.onClickCreate}>Create</Button>
        </Box>);
    }

    onClickCreate() {
        console.log(this.state.action);

        const body = {
            action_key: this.state.action.data.base_key,
            action_type: this.state.action.data.action_type,
            action: {
                parameters: this.state.action.data.action.parameters,
            },
            reactions: this.state.reactions.map((reaction) => reaction.reaction),
        }

        app.post('/applets', body, config(this.context.getToken())).then((response) => {
            console.log(response.data);

        }).catch((err) => {
            console.log(err.response.data);
        })
    }

    onChangeTitle(event) {
        this.setState({appletTitle: event.target.value})
    }

    showTitle() {
        return (
            <Box sx={{ mt: 2 }} style={styles.topBar.centerMenu}>
                <TextField variant="standard" value={this.state.appletTitle} onChange={this.onChangeTitle}/>
            </Box>
        )
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {this.showDialogs()}
                {this.showTitle()}
                <Box style={styles.content}>
                    <Container>
                        <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: "center"}}>
                            {this.showActionButton()}
                            {this.showReactionButton()}
                            {this.showCreateButton()}
                        </Box>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }
}
