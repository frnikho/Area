import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import style from "../Resources/CSS/DescriptionPage.css";
import { Navigate } from "react-router-dom";

import DescriptionLogo from "../Resources/assets/87795-loading-success.gif";

const theme = createTheme({
    palette: {
        type: "dark"
    }
});

export default function DescriptionPage(props) {

    return (
        <ThemeProvider theme={theme}>
            <div className="titleLeft">
                Epitech 2022 Project
            </div>
            <button className="buttonRight" onClick={() => props.setRedirectUrl("/")}>
                ←
            </button>
            <div className="space" />
            <div className="container">
                <img style={{ width: '8%', height: '8%' }} src={DescriptionLogo} alt="loading..." />
                <div className="rect">
                    <div className="description">
                        What is Area ?
                        <div className="littleSpace" />
                        Area est un service web permettant à ses utilisateurs de créer des chaînes d'instruction simples appelées applets.
                        Une applet est déclenchée par des changements qui interviennent au sein de services web tels que Gmail, Discord ou encore slack.
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
