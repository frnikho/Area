import { withCookies } from "react-cookie";
import React from "react";
import { ThemeProvider, Grid, Box } from "@mui/material";

import ControllerAppletProperty from "../../Controllers/Area/ControllerAppletProperty"
import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";
import Style from "../../Resources/Styles/styleAppletProperty"
import Header from "../../Components/Header"
import { theme } from "../../Resources/Styles/AppTheme";
import { withParams } from "../../utils/NavigateTools"

export default withCookies(withParams(class AppletPropertyPage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            user: undefined,
            services: undefined
        }
        this.cookies = props;
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() === undefined) {
            this.setRedirectUrl({ url: '/auth/login' })
        } else {
            this.setState({ user: this.authContext.getUser() })
        }
        this.controllerAppletProperty = new ControllerAppletProperty(this.authContext, this.cookies, this);
    }

    render() {
        if (!this.authContext)
            return (null);
        return (this.pageRender(this, function RenderAppletPropertyPage({ component }) {

            const menu = {
                right: [
                    {
                        name: 'Create',
                        style: {
                            paddingTop: "6px",
                            background: "black",
                            height: "50%",
                            borderRadius: '50px',
                            borderColor: 'white',
                            fontFamily: 'Dongle',
                            fontSize: '45px',
                            textTransform: "none",
                            color: "white"
                        },
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
                    <Header component={component} menu={menu} />
                    <div style={Style.container}>
                        My applets
                    </div>
                </ThemeProvider >
            )
        }));
    }
}))
