import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { Navigate } from "react-router-dom";

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
                        Area est un service web permettant à ses utilisateurs de créer des chaînes d'instruction simples appelées applets.
                        Une applet est déclenchée par des changements qui interviennent au sein de services web tels que Gmail, Discord ou encore slack.
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
