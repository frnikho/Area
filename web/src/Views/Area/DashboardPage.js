import { withCookies } from "react-cookie";
import React from "react";
import { ThemeProvider, Grid, Box } from "@mui/material";

import ControllerDashboard from "../../Controllers/Area/ControllerDashboard"
import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";
import Style from "../../Resources/Styles/styleDashboard"
import ServicePage from "../../Views/Area/ServicePage"
import Header from "../../Components/Header"
import { theme } from "../../Resources/Styles/AppTheme";

const menu = [
    {
        name: 'Create',
        style: {
            paddingTop: "6px",
            background: "black",
            height: "50%",
            borderRadius: '50px',
            borderColor: 'white',
            fontFamily: 'Dongle',
            fontSize: '50px',
            textTransform: "none",
            color: "white"
        },
        variant: "contained",
        redirectUrl: "/area/applets"
    },
    {
        name: 'Area',
        redirectUrl: "/description"
    },
    {
        name: 'My applets',
        redirectUrl: undefined
    },
    {
        name: 'Profile',
        redirectUrl: "/area/profile"
    },
]

export default withCookies(class DashboardPage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            services: undefined
        }
        this.cookies = props;
        this.showServices = this.showServices.bind(this)
        this.theme = theme
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() === undefined) {
            this.setRedirectUrl('/auth/login')
        } else {
            this.setState({ user: this.authContext.getUser() })
        }
        this.controllerDashboard = new ControllerDashboard(this.authContext, this.cookies, this);
        this.controllerDashboard.loadServices();
        this.controllerDashboard.loadApplets()
    }

    showServices(component) {
        if (component.state.services === undefined)
            return (null);
        return component.state.services.map((service, index) => (
            <Grid item xs={2} sm={4} md={2.9} key={index} justifyContent={"center"} textAlign={"center"}>
                <ServicePage service={service} />
            </Grid>
        ))
    }

    render() {
        if (!this.authContext)
            return (null);
        return (this.pageRender(this, function RenderDashboardPage({ component }) {

            return (
                <ThemeProvider theme={component.theme}>
                    <Header component={component} menu={menu} />
                    <div style={Style.container}>
                        My applets
                    </div>
                    <Box sx={{ marginLeft: "2%", marginRight: "auto" }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {component.showServices(component)}
                        </Grid>
                    </Box>
                </ThemeProvider >
            )
        }));
    }
})
