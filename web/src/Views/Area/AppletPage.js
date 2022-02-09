import React from "react";
import {Box, Button, ButtonBase, Container, IconButton, Paper, ThemeProvider, Typography} from "@mui/material";
import {FaQuestion} from "react-icons/fa/index";
import {styles} from "../../Styles/AppletPageStyles";
import {theme} from "../../Styles/AppTheme";
import { Navigate } from "react-router-dom";
import ActionDialog from "../Dialogs/ActionDialog";
import ReactionDialog from "../Dialogs/ReactionDialog";
import HelpDialog from "../Dialogs/HelpDialog";
import AddIcon from '@mui/icons-material/Add';

class AppletPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: undefined,
            action: undefined,
            reactions: [],
            currentDialog: undefined,
        }
        this.onActionSelected = this.onActionSelected.bind(this);
        this.onReactionSelected = this.onReactionSelected.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onClickAddReaction = this.onClickAddReaction.bind(this);
        this.onClickAddAction = this.onClickAddAction.bind(this);
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

    onReactionSelected(reaction) {
        console.log(reaction);
    }

    onClose() {
        this.setState({
            redirectUrl: "/"
        })
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
        if (this.state.currentDialog === undefined)
            return;
        if (this.state.currentDialog === "ACTION_DIALOG")
            return <ActionDialog onSelected={this.onActionSelected} onClose={this.onCloseDialog}/>
        if (this.state.currentDialog === "REACTION_DIALOG")
            return <ReactionDialog currentAction={this.state.action} onSelected={this.onReactionSelected} onClose={this.onCloseDialog}/>
        if (this.state.currentDialog === "HELP_DIALOG")
            return <HelpDialog onClose={this.onCloseDialog}/>
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
                <Paper sx={{backgroundColor: `${this.state.action.service.color}`, mb:4, mt: 1, borderRadius: 8}}>
                    <ButtonBase sx={{borderRadius: 8}} centerRipple={true} onClick={this.onClickAddAction}>
                        <Box sx={{width: 600, p: 3, borderRadius: 8}}>
  {/*                          <Box sx={{mb: 2}}>
                                <MdEditNote color={"white"} size={24}/>
                            </Box>*/}
                            <img src={`https://localhost:8080/static/` + this.state.action.service.icon} width={50}/>
                            <Typography variant={"h4"} fontFamily={"Roboto"} fontWeight={"700"} color={"white"}>{this.state.action.about.name}</Typography>
                        </Box>
                    </ButtonBase>
                </Paper>
            )
        }
    }

    showReactionButton() {
        if (this.state.reactions.length === 0) {
            return (<Paper sx={{backgroundColor: "#999999", borderRadius: 8}}>
                <ButtonBase disabled={this.state.action === undefined} sx={{borderRadius: 8}} centerRipple={true} onClick={this.onClickAddReaction}>
                    <Box sx={{width: 600, p: 3, borderRadius: 8}}>
                        <Typography variant={"h1"} fontFamily={""} fontWeight={"700"} color={"white"}>Then that <AddIcon size={40}/></Typography>
                    </Box>
                </ButtonBase>
                </Paper>)
        } else {

        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                {this.state.redirectUrl !== undefined ? <Navigate to={"/"}/> : null}
                {this.showDialogs()}
                <Box sx={{pb: 2, mx: 2}} style={styles.topBar.main}>
                    <Box style={styles.topBar.leftMenu}>
                        <Button onClick={() => this.onClose()}>Close</Button>
                    </Box>
                    <Box sx={{mt: 2}} style={styles.topBar.centerMenu}>
                        <Typography fontFamily={"Dongle"} color={"black"} fontSize={50}>New Applet</Typography>
                    </Box>
                    <Box style={styles.topBar.rightMenu}>
                        <IconButton onClick={() => this.onClickHelp()}>
                            <FaQuestion size={40}/>
                        </IconButton>
                    </Box>
                </Box>
                <Box style={styles.content}>
                   <Container>
                       <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: "center" }}>
                           {this.showActionButton()}
                           {this.showReactionButton()}
                       </Box>
                   </Container>
                </Box>
            </ThemeProvider>
        );
    }
}

export default AppletPage;
