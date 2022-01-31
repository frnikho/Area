import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import DescriptionLogo from "../Resources/assets/87795-loading-success.gif";
import useStyles from "../Components/Styles/styleDescription.js"

const theme = createTheme({
    palette: {
        type: "dark"
    }
});

export default function DescriptionPage(props) {

    const classe = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classe.title}>
                <div className={classe.titleLeft}>
                    <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>Epitech 2022 Project</Button>
                </div>
                <div className={classe.menuRight}>
                    <Stack direction="row" spacing={2}>
                        <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }} onClick={() => props.setRedirectUrl("/")}>
                            ←
                        </Button>
                    </Stack>
                </div>
            </div>
            {/* <div className={classe.space} /> */}
            <div className={classe.container}>
                <img style={{ width: '10%', height: '10%' }} src={DescriptionLogo} alt="loading..." />
                <div className={classe.rect}>
                    <div className={classe.description}>
                        What is Area ?
                        <div className={classe.littleSpace} />
                        Area is a web service that allows its users to create simple instruction strings called applets.
                        An applet is triggered by changes in web services such as Gmail, Discord or slack.
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
