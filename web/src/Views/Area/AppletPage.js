import React from "react";
import { Box, ButtonBase, Container, Paper, ThemeProvider, Typography } from "@mui/material";
import { styles } from "../../Resources/Styles/AppletPageStyles";
import { theme } from "../../Resources/Styles/AppTheme";
import ActionDialog from "../Dialogs/ActionDialog";
import ReactionDialog from "../Dialogs/ReactionDialog";
import HelpDialog from "../Dialogs/HelpDialog";
import AddIcon from '@mui/icons-material/Add';
import Page from "../Page"
import Header from "../../Components/Header"

class AppletPage extends Page {

    constructor(props) {
        super(props);
        this.state = {
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

    onActionSelected(action) {
        console.log(action);
    }

    onReactionSelected(reaction) {
        console.log(reaction);
    }

    onClose() {
        this.setRedirectUrl('/')
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
            return <ActionDialog onSelected={this.onActionSelected} onClose={this.onCloseDialog} />
        if (this.state.currentDialog === "REACTION_DIALOG")
            return <ReactionDialog onSelected={this.onReactionSelected} onClose={this.onCloseDialog} />
        if (this.state.currentDialog === "HELP_DIALOG")
            return <HelpDialog onClose={this.onCloseDialog} />
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

        }
    }

    showReactionButton() {
        if (this.state.reactions.length === 0) {
            return (<Paper sx={{ backgroundColor: "#999999", borderRadius: 8 }}>
                <ButtonBase sx={{ borderRadius: 8 }} centerRipple={true} onClick={this.onClickAddReaction}>
                    <Box sx={{ width: 600, p: 3, borderRadius: 8 }}>
                        <Typography variant={"h1"} fontFamily={""} fontWeight={"700"} color={"white"}>Then that <AddIcon size={40} /></Typography>
                    </Box>
                </ButtonBase>
            </Paper>)
        } else {

        }
    }

    render() {

        return (this.pageRender(this, function RenderAppletPage({ component }) {

            const menu = {
                right: [
                    {
                        name: '?',
                        action: () => component.onClickHelp()
                    },
                ],
                left: {
                    name: "Cancel",
                    action: () => component.setRedirectUrl("/"),
                }
            }

            return (
                <ThemeProvider theme={theme}>
                    {component.showDialogs()}
                    <Header component={component} menu={menu} />
                    <Box sx={{ mt: 2 }} style={styles.topBar.centerMenu}>
                        <Typography fontFamily={"Dongle"} color={"black"} fontSize={50}>New Applet</Typography>
                    </Box>
                    <Box style={styles.content}>
                        <Container>
                            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: "center" }}>
                                {component.showActionButton()}
                                {component.showReactionButton()}
                            </Box>
                        </Container>
                    </Box>
                </ThemeProvider>
            )
        }));
    }
}

export default AppletPage;
