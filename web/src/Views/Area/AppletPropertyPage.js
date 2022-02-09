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
        this.setRedirectUrl({url: "/area/dashboard"})
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
                        <div style={Style.container}>
                            My applets
                        </div>
                    </Box>
                </ThemeProvider >
            )
        }));
    }
}))
