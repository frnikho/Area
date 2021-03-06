import { withCookies } from "react-cookie";
import React from "react";
import { ThemeProvider, CssBaseline, Box, Button } from "@mui/material";

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
        }
        this.cookies = props;
        this.handleSwitch = this.handleSwitch.bind(this)
        this.onClickBack = this.onClickBack.bind(this);
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() === undefined) {
            this.setRedirectUrl({ url: '/auth/login' })
        } else {
            this.setState({ user: this.authContext.getUser() })
        }
        this.controllerAppletProperty = new ControllerAppletProperty(this.authContext, this.cookies, this);
        this.controllerAppletProperty.loadApplet();
    }

    handleSwitch() {
        this.setState({ isOn: !this.state.isOn })
        !this.state.isOn ? this.controllerAppletProperty.enableApplet() : this.controllerAppletProperty.disableApplet()
    }

    onClickBack() {
        this.setRedirectUrl({ url: "/area/dashboard" })
    }

    render() {
        if (!this.authContext)
            return (null);
        return (this.pageRender(this, function RenderAppletPropertyPage({ component }) {

            const buttonMenu = { fontFamily: 'Dongle', fontSize: '30px', textTransform: "none", color: "white", margin: "auto" }
            const menu = {
                right: [
                    {
                        name: 'Create',
                        style: Style.roundButtonFull,
                        variant: "contained",
                        action: () => component.setRedirectUrl({ url: "/area/applets/add" })
                    },
                    // {
                    //     name: 'Area',
                    //     action: () => component.setRedirectUrl({ url: "/description" })
                    // },
                    {
                        name: 'Services',
                        action: () => component.setRedirectUrl({ url: "/area/context" })
                    },
                    {
                        name: 'Profile',
                        action: () => component.setRedirectUrl({ url: "/area/profile" })
                    },
                ],
                left: {
                    action: () => component.setRedirectUrl({ url: "/area/dashboard" })
                }
            }

            return (
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box style={{ backgroundColor: (component.state.applet && component.state.applet.color) || "grey"}}>
                        <Header component={component} menu={menu} />
                        <Box sx={{ pb: 2, mx: 2 }} style={{ paddingLeft: "10px" }}>
                            <Button
                                style={Style.roundButtonFull}
                                onClick={() => component.onClickBack()}>
                                {"< Back"}
                            </Button>
                        </Box>
                        <Box sx={{ pb: 2, mx: 2 }} />
                        <div style={Style.container}>
                            <Box sx={{ pb: 2, mx: 2 }} style={{ width: "800px" }}>
                                <Box style={{ textAlign: "left", paddingLeft: "20px", fontStyle: "bold" }}>
                                    {(component.state.applet && component.state.applet.title) || "Applet's title"}
                                </Box>
                                <Box style={{ textAlign: "left", paddingLeft: "20px", fontSize: "30px" }}>
                                    {(component.state.applet && component.state.applet.description) || "Dame, plus simple on peut pas faire, quand m??me, plus besoin de votre crayon gris pour ??crire des longs textes. Bon, faut dire ce qui est, des fois ??a part an distribil, dans le lagen, mais c'est pas la mort."}
                                </Box>
                                <Box style={{ textAlign: "left", paddingLeft: "20px", fontSize: "20px", }}>
                                    {(component.state.applet && component.state.applet.author) || "by github <3"}
                                </Box>
                            </Box>
                        </div>
                    </Box>
                    <Box sx={{ pb: 2, mx: 2 }} />
                    <Box sx={{ pb: 2, mx: 2 }} />
                    <div style={Style.container}>
                        <SwitchButton isOn={component.state.isOn} onClick={() => component.handleSwitch()} />
                    </div>
                    <Box sx={{ width: "225px", height: "75px", display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "0 auto", }}/>
                    <Box sx={{ width: "125px", height: "75px", display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "0 auto", }}>
                        <Button variant="contained" color="error" style={buttonMenu} onClick={() => component.controllerAppletProperty.deleteApplet()}>Delete</Button>
                    </Box>
                </ThemeProvider >
            )
        }));
    }
}))
