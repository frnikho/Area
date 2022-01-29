import React from "react";
import { createTheme, ThemeProvider, Grid, Box } from "@mui/material";
import { FaGithubSquare, FaSlack } from "react-icons/fa";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
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
            icon: <FaGithubSquare size={70}/>,
            description: "Action github push"
        },
        {
            name: "GitHub",
            color: "green",
            icon: <FaGithubSquare size={70}/>,
            description: "Action github pull"
        },
        {
            name: "GitHub",
            color: "yellow",
            icon: <FaGithubSquare size={70}/>,
            description: "Action github merge"
        },
        {
            name: "Slack",
            color: "green",
            icon: <FaSlack size={70}/>,
            description: "Receive private msg"
        },
        {
            name: "Slack",
            color: "red",
            icon: <FaSlack size={70}/>,
            description: "Receive groupe msg"
        }
    ]

    const classe = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <div className={classe.titleLeft}>
                <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>Epitech 2022 Project</Button>
            </div>
            <div className={classe.menuRight}>
                <Stack direction="row" spacing={2}>
                    <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }} onClick={() => props.setRedirectUrl("/description")}>Area</Button>
                    <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }} onClick={() => props.logout()}>Logout</Button>
                </Stack>
            </div>
            <div className={classe.space} />
            <div className={classe.container}>
                My applets
            </div>
            <Box sx={{ marginLeft: "2%", marginRight: "auto" }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {applets.map((it, index) => (
                        <Grid item xs={2} sm={4} md={2.9} key={index}>
                            <ControllerService {...it} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </ThemeProvider >
    );
}
