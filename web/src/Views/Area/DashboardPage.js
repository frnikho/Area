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

    const classe = useStyles()

    const showServices = () => {
        if (props.state.services === undefined)
            return;
        return props.state.services.map((service, index) => (
            <Grid item xs={2} sm={4} md={2.9} key={index} justifyContent={"center"} textAlign={"center"}>
                <ControllerService service={service}/>
            </Grid>
        ))
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classe.title}>
                <div className={classe.titleLeft}>
                    <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>Epitech 2022 Project</Button>
                </div>
                <div className={classe.menuRight}>
                    <Stack direction="row" spacing={2}>
                        <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }} onClick={() => props.setRedirectUrl("/description")}>Area</Button>
                        <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }} onClick={() => props.logout()}>Logout</Button>
                    </Stack>
                </div>
            </div>
            {/* <div className={classe.space} /> */}
            <div className={classe.container}>
                My applets
            </div>
            <Box sx={{ marginLeft: "2%", marginRight: "auto" }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {showServices()}
                </Grid>
            </Box>
        </ThemeProvider >
    );
}
