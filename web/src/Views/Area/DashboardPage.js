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
import app, { config } from "../../Utils/Axios";

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
            this.controllerDashboard = new ControllerDashboard(this.authContext, this.cookies, this);
            this.controllerDashboard.loadServices()
            this.controllerDashboard.loadApplets()
        }
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
            return component.state.applets.map((applet, index) => (
                // <Grid item xs={2} sm={4} md={4} key={index}>
                <Grid item /* xs={2} sm={4} md={2.9} */ /* spacing={1} */ key={index}>
                    <AppletsPage applet={applet}  />
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
                        // action: () => component.setRedirectUrl({ url: "/area/applets/add" })
                        action: () => {
                            app.post("/applets", {
                                "action_key": "frnikho/blogjs",
                                "action_type": "github_repository_push",
                                "action": {
                                    "parameters": [
                                        {
                                            "name": "repository_name",
                                            "value": "frnikho/blogjs"
                                        }
                                    ]
                                },
                                "reactions": [
                                    {
                                        "type": "discord_send_chanel_message",
                                        "base_key": "123456",
                                        "parameters": [
                                            {
                                                "name": "chanel_id",
                                                "value": "123456"
                                            },
                                            {
                                                "name": "text",
                                                "value": "456789"
                                            }
                                        ]
                                    }
                                ],
                                "title": "myApplets",
                            }, config(component.authContext.getToken())).then((response) => {
                                console.log(response);
                            }).catch((err) => {
                                console.log(err)
                            })
                        }
                    },
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
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent={"center"} textAlign={"center"}>
                            {component.showApplets(component)}
                        </Grid>
                    </Box>
                </ThemeProvider >
            )
        }));
    }
})
