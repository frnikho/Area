import React from "react";
import { Box, ButtonBase, Container, Paper, ThemeProvider, Typography,CssBaseline } from "@mui/material";
import { styles } from "../../Resources/Styles/AppletPageStyles";
import { theme } from "../../Resources/Styles/AppTheme";
import ActionDialog from "../Dialogs/ActionDialog";
import ReactionDialog from "../Dialogs/ReactionDialog";
import HelpDialog from "../Dialogs/HelpDialog";
import AddIcon from '@mui/icons-material/Add';
import Page from "../Page"
import Header from "../../Components/Header"

/**
 * @class AppletPage
 * Page for create an applets
 */
export default class AppletPage extends Page {

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
        this.setRedirectUrl({url: '/'})
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
            REACTION_DIALOG: <ReactionDialog onSelected={this.onReactionSelected} onClose={this.onCloseDialog} />,
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
                <Paper sx={{backgroundColor: `${this.state.action.service.color}`, mb:4, mt: 1, borderRadius: 8}}>
                    <ButtonBase sx={{borderRadius: 8}} centerRipple={true} onClick={this.onClickAddAction}>
                        <Box sx={{width: 600, p: 3, borderRadius: 8}}>
  {/*                          <Box sx={{mb: 2}}>
                                <MdEditNote color={"white"} size={24}/>
                            </Box>*/}
                            <img src={`https://localhost:8080/static/` + this.state.action.service.icon} width={50} alt="Loarding . . ."/>
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
                    action: () => component.setRedirectUrl({url: "/"}),
                }
            }

            return (
                <ThemeProvider theme={theme}>
                    <CssBaseline />
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
