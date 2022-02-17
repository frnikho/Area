import { withCookies } from "react-cookie";
import React from "react";
import { ThemeProvider, Grid, Box, CssBaseline } from "@mui/material";

import ControllerDashboard from "../../Controllers/Area/ControllerDashboard"
import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";
import Style from "../../Resources/Styles/styleDashboard"
import AppletsPage from "./AppletsPage"
import Header from "../../Components/Header"
import { theme } from "../../Resources/Styles/AppTheme";

export default withCookies(class DashboardPage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            services: undefined,
            applets: undefined,
        }
        this.cookies = props;
        this.showApplets = this.showApplets.bind(this)
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() === undefined) {
            this.setRedirectUrl({ url: '/auth/login' })
        } else {
            this.setState({ user: this.authContext.getUser() })
        }
        this.controllerDashboard = new ControllerDashboard(this.authContext, this.cookies, this);
        this.controllerDashboard.loadServices();
        this.controllerDashboard.loadApplets()
    }

    showApplets(component) {
        if (component.state.applets === undefined || component.state.applets.length === 0 || component.state.applets.length === undefined)
            return (
                <div style={{ ...Style.container, fontSize: 30 }}>
                    <div style={{ margin: "75px" }} />
                    No applets found
                </div>
            );
        else
            return component.state.applets.map((applets, index) => (
                <Grid item xs={2} sm={4} md={2.9} key={index} justifyContent={"center"} textAlign={"center"}>
                    <AppletsPage {...{...applets, ...{onClick: () => console.log("onclick")}}} />
                </Grid>
            ))
    }

    render() {
        if (!this.authContext)
            return (null);
        return (this.pageRender(this, function RenderDashboardPage({ component }) {

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
                    {
                        name: 'applets test',
                        action: () => component.setRedirectUrl({ url: "/area/applets/property", params: 1234 })
                    },
                ],
                left: {
                    // action: () => console.log("hello world")
                }
            }


            return (
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header component={component} menu={menu} />
                    <div style={Style.container}>
                        My applets
                    </div>
                    <Box sx={{ marginLeft: "2%", marginRight: "auto" }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {component.showApplets(component)}
                        </Grid>
                    </Box>
                </ThemeProvider >
            )
        }));
    }
})
