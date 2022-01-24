import React from "react";
import Lottie from "lottie-react";
import { Box, Button, Checkbox, Container, createTheme, ThemeProvider, FormControlLabel, TextField, Typography, } from "@mui/material";
import { Link } from "react-router-dom";
import { FaGoogle, FaGithubSquare } from "react-icons/fa";
import { GoogleLogin } from 'react-google-login';

import NotifAuthComponent from "../Components/utils/NotifAuthComponent"
import style from "../Resources/CSS/DashboardPage.css"

const theme = createTheme({
    palette: {
        type: "dark"
    }
});

export default function DashboardPage(props) {

    return (
        <ThemeProvider theme={theme}>
            <div className="titleLeft">
                Epitech 2022 Project
            </div>
            <button className="buttonRight" onClick={() => props.setRedirectUrl("/area")}>
                Area
            </button>
        </ThemeProvider>
    );
}
