import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";

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
            <div className={classe.titleLeft}>
                Epitech 2022 Project
            </div>
            <button className={classe.buttonRight} onClick={() => props.setRedirectUrl("/")}>
                ←
            </button>
            <div className={classe.space} />
            <div className={classe.container}>
                <img style={{ width: '8%', height: '8%' }} src={DescriptionLogo} alt="loading..." />
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
