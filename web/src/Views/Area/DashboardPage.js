import React from "react";
import { createTheme, ThemeProvider, Grid, Box } from "@mui/material";

// eslint-disable-next-line
import Card from "@material-ui/core/Card";
import ControllerService from "../../Controllers/Area/ControllerService"
import useStyles from "../../Components/Styles/styleDashboard"

const theme = createTheme({
    palette: {
        type: "dark"
    }
});

export default function DashboardPage(props) {

    const applets = [
        {
            name: "GitHub",
            color: "blue",
            description: "Action github push"
        },
        {
            name: "GitHub",
            color: "green",
            description: "Action github pull"
        },
        {
            name: "GitHub",
            color: "yellow",
            description: "Action github merge"
        },
        {
            name: "Slack",
            color: "green",
            description: "Receive private msg"
        },
        {
            name: "Slack",
            color: "red",
            description: "Receive groupe msg"
        }
    ]

    const classe = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <div className={classe.titleLeft}>
                Epitech 2022 Project
            </div>
            <button className={classe.buttonRight} onClick={() => props.setRedirectUrl("/description")}>
                Area
            </button>
            <div className={classe.space} />
            <div className={classe.container}>
                My applets
            </div>
            <Box sx={{ marginLeft: "2%", marginRight: "auto" }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {applets.map((it) => (
                        <Grid item xs={2} sm={4} md={2.9}>
                            <ControllerService {...it} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </ThemeProvider >
    );
}
