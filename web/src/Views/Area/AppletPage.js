import React from "react";
import {Box, Button, IconButton, ThemeProvider, Typography} from "@mui/material";
import {FaQuestion} from "react-icons/fa/index";
import {styles} from "../../Styles/AppletPageStyles";
import {theme} from "../../Styles/AppTheme";
import { Navigate } from "react-router-dom";
import ActionDialog from "../Dialogs/ActionDialog";
import ReactionDialog from "../Dialogs/ReactionDialog";
import HelpDialog from "../Dialogs/HelpDialog";

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
    }

    onActionSelected() {

    }

    onReactionSelected() {

    }

    onClose() {
        this.setState({
            redirectUrl: "/"
        })
    }

    onClickHelp() {

    }

    onClickAddAction() {

    }

    onClickAddReaction() {

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
            return <ReactionDialog onSelected={this.onReactionSelected} onClose={this.onCloseDialog}/>
        if (this.state.currentDialog === "HELP_DIALOG")
            return <HelpDialog onClose={this.onCloseDialog}/>
    }

    showActionButton() {
        if (this.state.action === undefined) {

        } else {

        }
    }

    showReactionButton() {
        if (this.state.reactions.length === 0) {

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
                    Hello
                </Box>
            </ThemeProvider>
        );
    }
}

export default AppletPage;
