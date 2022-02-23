import { withCookies } from "react-cookie";
import React from "react";
import { ThemeProvider, CssBaseline, Box, Button, TextField, IconButton, Typography } from "@mui/material";

import ControllerAppletProperty from "../../Controllers/Area/ControllerAppletProperty"
import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";
import Style from "../../Resources/Styles/styleAppletProperty"
import Header from "../../Components/Header"
import { theme } from "../../Resources/Styles/AppTheme";
import { withParams } from "../../Utils/NavigateTools"
import SwitchButton from "../../Components/SwitchButton"


export default withCookies(withParams(class AppletPropertyPage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            applet: undefined,
            isOn: false,
            editTitle: false,
        }
        this.cookies = props;
        this.handleSwitch = this.handleSwitch.bind(this)
        this.handleChandleTitle = this.handleChandleTitle.bind(this)
        this.onClickBack = this.onClickBack.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.showTitle = this.showTitle.bind(this)
        this.showEditButton = this.showEditButton.bind(this)
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() === undefined) {
            this.setRedirectUrl({ url: '/auth/login' })
        } else {
            this.setState({ user: this.authContext.getUser() })
            this.controllerAppletProperty = new ControllerAppletProperty(this.authContext, this.cookies, this);
            this.controllerAppletProperty.loadServices()
            this.controllerAppletProperty.loadApplet();
        }
    }

    handleSwitch() {
        this.setState({ isOn: !this.state.isOn })
        !this.state.isOn ? this.controllerAppletProperty.enableApplet() : this.controllerAppletProperty.disableApplet()
    }

    onClickBack() {
        this.setRedirectUrl({ url: "/area/dashboard" })
    }

    onEditClick() {
        //save Title
        console.log("save Title")
        this.setState({ editTitle: !this.state.editTitle })
    }

    handleChandleTitle(e) {
        this.setState({
            applet: { ...this.state.applet, title: e.target.value },
        })
    }

    showTitle() {
        return (
            <Box style={{ textAlign: "left", paddingLeft: "20px", fontSize: "50px", lineHeight: "80px", fontFamily: "Anton" }}>
                {this.state.editTitle === false ? (this.state.applet && this.state.applet.title) || "Title" : <TextField
                    id="filled-multiline-static"
                    label="Title"
                    multiline
                    rows={4}
                    onChange={(e) => this.handleChandleTitle(e)}
                    defaultValue={(this.state.applet && this.state.applet.title) || "title"}
                    variant="filled"
                />}
                <Box style={{ textAlign: "left", fontSize: "20px", lineHeight: "30px", fontFamily: "Anton", fontWeight: ""}}>
                    {this.state.applet && this.state.applet.description}
                </Box>
            </Box>
        )
    }

    showEditButton() {
        return (
            <Box style={Style.menuRight}>
                <Button variant="text" style={Style.edit} onClick={() => this.onEditClick()}>
                    {this.state.editTitle === false ? "Edit Title" : "Save"}
                </Button>
            </Box>
        )
    }

    render() {
        // if (!this.authContext || !this.state.applet)
        if (!this.authContext)
            return (null);
        const buttonMenu = { fontFamily: 'Dongle', fontSize: '30px', textTransform: "none", color: "white", margin: "auto" }
        const menu = {
            right: [
                {
                    name: 'Create',
                    style: Style.roundButtonFull,
                    variant: "contained",
                    action: () => this.setRedirectUrl({ url: "/area/applets/add" })
                },
                {
                    name: 'Services',
                    action: () => this.setRedirectUrl({ url: "/area/context" })
                },
                {
                    name: 'Profile',
                    action: () => this.setRedirectUrl({ url: "/area/profile" })
                },
            ],
            left: {
                action: () => this.setRedirectUrl({ url: "/area/dashboard" })
            }
        }

        return (
            <ThemeProvider theme={theme}>
                {super.render()}
                <CssBaseline />
                <Box style={{ backgroundColor: (this.state.applet && this.state.applet.color) || "grey" }}>
                    <Header component={this} menu={menu} />
                    <Box sx={{ pb: 2, mx: 2 }} style={{ paddingLeft: "10px" }}>
                        <Button
                            style={Style.roundButtonFull}
                            onClick={() => this.onClickBack()}>
                            {"< Back"}
                        </Button>
                    </Box>
                    <Box sx={{ pb: 2, mx: 2 }} />
                    <div style={Style.container}>
                        <Box sx={{ pb: 2, mx: 2 }} style={{ width: "500px" }}>
                            <Box style={{ textAlign: "left", paddingLeft: "20px", fontStyle: "bold" }}>
                                {(this.state.applet && this.state.applet.icon) &&
                                    <IconButton >
                                        <img src={`https://localhost:8080/static/${this.state.applet.icon}`} width={80} alt="Loarding . . ." />
                                    </IconButton>
                                }
                            </Box>
                            {this.showTitle()}
                            {/* add button for edit title but miss route in server */}
                            {/* {this.showEditButton()} */}
                            <Box style={{ textAlign: "left", paddingLeft: "20px", fontSize: "30px", fontFamily: "Dongle" }}>
                                {"by " + ((this.state.applet && this.state.applet.author) || "author service")}
                            </Box>
                        </Box>
                    </div>
                </Box>
                <Box sx={{ pb: 2, mx: 2 }} />
                <Box sx={{ pb: 2, mx: 2 }} />
                <div style={Style.container}>
                    <SwitchButton isOn={this.state.isOn} onClick={() => this.handleSwitch()} />
                </div>
                <Box sx={{ width: "225px", height: "75px", display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "0 auto", }} />
                <Box sx={{ width: "125px", height: "75px", display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "0 auto", }}>
                    <Button variant="contained" color="error" style={buttonMenu} onClick={() => this.controllerAppletProperty.deleteApplet()}>Delete</Button>
                </Box>
            </ThemeProvider >
        )
    }
}))
