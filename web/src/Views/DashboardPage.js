import React from "react";
import { createTheme, ThemeProvider, Grid, Box } from "@mui/material";

// eslint-disable-next-line
import style from "../Resources/CSS/DashboardPage.css"
import Card from "@material-ui/core/Card";
import ServicePage from "./ServicePage.js"

const theme = createTheme({
    palette: {
        type: "dark"
    }
});

export default function DashboardPage(props) {

    // const Item = () => ({
    // }));

    const applets = [
        {
            name: "GitHub",
            description: "Action github push"
        },
        {
            name: "GitHub",
            description: "Action github pull"
        },
        {
            name: "GitHub",
            description: "Action github merge"
        },
        {
            name: "Slack",
            description: "Receive private msg"
        },
        {
            name: "Slack",
            description: "Receive groupe msg"
        }
    ]


    return (
        <ThemeProvider theme={theme}>
            <div className="titleLeft">
                Epitech 2022 Project
            </div>
            <button className="buttonRight" onClick={() => props.setRedirectUrl("/description")}>
                Area
            </button>
            <div className="space" />
            <div className="container">
                My applets
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {applets.map((it) => (
                        <ServicePage {... it.name}/>
                    ))}
                </Grid>
            </Box>
        </ThemeProvider>
    );
}
