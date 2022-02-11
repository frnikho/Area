import { withCookies } from "react-cookie";
import React from "react";
import { ThemeProvider, CssBaseline, Box, Button } from "@mui/material";
import { styled } from '@mui/system';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';

import ControllerAppletProperty from "../../Controllers/Area/ControllerAppletProperty"
import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";
import Style from "../../Resources/Styles/styleAppletProperty"
import Header from "../../Components/Header"
import { theme } from "../../Resources/Styles/AppTheme";
import { withParams } from "../../Utils/NavigateTools"

const blue = {
    500: '#007FFF',
};

const grey = {
    400: '#BFC7CF',
    500: '#AAB4BE',
};

export default withCookies(withParams(class AppletPropertyPage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            services: undefined
        }
        this.cookies = props;
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
        this.controllerAppletProperty.loadApplet("<id exemple>");
    }

    onClickBack() {
        this.setRedirectUrl({ url: "/area/dashboard" })
    }

    render() {
        if (!this.authContext)
            return (null);
        return (this.pageRender(this, function RenderAppletPropertyPage({ component }) {

            const menu = {
                right: [
                    {
                        name: 'Create',
                        style: Style.roundButtonFull,
                        variant: "contained",
                        action: () => component.setRedirectUrl({ url: "/area/applets/add" })
                    },
                    {
                        name: 'Area',
                        action: () => component.setRedirectUrl({ url: "/description" })
                    },
                    {
                        name: 'My applets',
                        action: () => component.setRedirectUrl({ url: "/area/dashboard" })
                    },
                    {
                        name: 'Profile',
                        action: () => component.setRedirectUrl({ url: "/area/profile" })
                    },
                ],
                left: {
                    action: () => console.log("hello world")
                }
            }

            return (
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box style={{ backgroundColor: "grey" }}>
                        <Header component={component} menu={menu} />
                        <Box sx={{ pb: 2, mx: 2 }} style={{ paddingLeft: "10px" }}>
                            <Button
                                variant="outlined"
                                size="small"
                                style={Style.roundButtonEmpty}
                                onClick={() => component.onClickBack()}>
                                {"< Back"}
                            </Button>
                        </Box>
                        <Box sx={{ pb: 2, mx: 2 }} />
                        <div style={Style.container}>
                            <Box sx={{ pb: 2, mx: 2 }} style={{ width: "800px" }}>
                                <Box style={{ textAlign: "left", paddingLeft: "20px", fontStyle: "bold" }}>
                                    Applet's title
                                </Box>
                                <Box style={{ textAlign: "left", paddingLeft: "20px", fontSize: "30px" }}>
                                    Dame, plus simple on peut pas faire, quand même, plus besoin de votre crayon gris pour écrire des longs textes. Bon, faut dire ce qui est, des fois ça part an distribil, dans le lagen, mais c'est pas la mort.
                                </Box>
                                <Box style={{ textAlign: "left", paddingLeft: "20px", fontSize: "20px", }}>
                                    {"by github <3"}
                                </Box>
                            </Box>
                        </div>
                    </Box>
                </ThemeProvider >
            )
        }));
    }
}))
