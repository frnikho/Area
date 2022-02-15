import React from "react";
import { ThemeProvider, Box, CssBaseline, Grid, IconButton } from "@mui/material";

import { AuthContext } from "../../Contexts/AuthContext";
import app, { config } from "../../Utils/Axios";

import Page from "../Page"
import Header from "../../Components/Header"
import Style from "../../Resources/Styles/styleContext"
import { theme } from "../../Resources/Styles/AppTheme";

export default class ContextPage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            services: undefined,
            selectedService: undefined,
            contexts: undefined
        }
        this.onClickSelectServiceIcon = this.onClickSelectServiceIcon.bind(this);
    }

    componentDidMount() {
        this.authContext = this.context;
        app.get('/about.json').then((response) => {
            this.setState({
                services: response.data.server.services
            })
        });

        app.get('/context/all', config(this.authContext.getToken())).then((response) => {
            console.log(response.data);
            this.setState({
                contexts: response.data,
            })
        });

    }

    onClickSelectServiceIcon(serviceName) {
        console.log(serviceName);
        this.setState({
            selectedService: serviceName,
        })
    }

    showServicesSelectIcon() {
        if (this.state.services === undefined)
            return;
        return <Grid container textAlign={"center"} alignItems={"center"}>
            {this.state.services.map((service, key) => {
                return (
                    <Grid item key={key}>
                        <Box sx={{ mx: 2 }}>
                            <IconButton onClick={() => this.onClickSelectServiceIcon(service.type)}>
                                <img src={`https://localhost:8080/static/${service.icon}`} width={80} alt="Loarding . . ." />
                            </IconButton>
                        </Box>
                    </Grid>
                )
            })}
        </Grid>
    }

    showContextWithFilter() {
        if (this.state.selectedService === undefined || this.state.contexts === undefined)
            return
        const namedContext = this.state.contexts.find((context) => context.service === this.state.selectedService);
        console.log(namedContext);
        return <h1>{namedContext.service}</h1>
    }

    render() {
        if (!this.authContext)
            return (null);
        return (this.pageRender(this, function RenderContextPropertyPage({ component }) {
            const menu = {
                right: [
                    {
                        name: 'Create',
                        style: Style.roundButtonFull,
                        variant: "contained",
                        action: () => component.setRedirectUrl({ url: "/area/applets/add" })
                    },
                    {
                        name: 'Services',
                        // action: () => component.setRedirectUrl({ url: "/area/context" })
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
                    <Header component={component} menu={menu} />
                    <div style={Style.container}>
                        Services
                    </div>
                    {component.showServicesSelectIcon()}
                    {component.showContextWithFilter()}
                </ThemeProvider>
            )
        }))
    }
}
