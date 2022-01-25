import React from "react";
import { Box, Button, Container, createTheme, ThemeProvider, TextField, Typography, } from "@mui/material";
import { FaGoogle, FaGithubSquare } from "react-icons/fa";
import { GoogleLogin } from 'react-google-login';
import { Navigate } from "react-router-dom";

import NotifAuthComponent from "../../Components/utils/NotifAuthComponent"
import RegisterLogo from "../../Resources/assets/38435-register.gif";

// eslint-disable-next-line
import style from "../../Resources/CSS/RegisterPage.css";

const theme = createTheme({
    palette: {
        type: "dark"
    }
});

export default function RegisterPage(props) {

    return (
        <ThemeProvider theme={theme}>
            {props.state.redirectUrl !== undefined ? <Navigate to={props.state.redirectUrl} /> : null}
            <div className="titleLeft">
                Epitech 2022 Project
            </div>
            <button className="buttonRight" onClick={() => props.setRedirectUrl("/description")}>
                Area
            </button>
            <div className="space" />
            <Container component="main" maxWidth="xs">
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img style={{ borderRadius: 50, width: '50%', height: '50%' }} src={RegisterLogo} alt="loading..." />
                    <Box sx={{ mb: 2 }}>
                        <Typography style={{ fontFamily: "Dongle", fontSize: 70 }} component="h1" variant="h4">
                            Register
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={props.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password" />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confpassword"
                            label="Confirm password"
                            type="password"
                            id="confpassword"
                            autoComplete="current-password" />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }} >
                            Sign In
                        </Button>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                render={renderProps => (
                                    <Button
                                        onClick={renderProps.onClick}
                                        color={"error"}
                                        variant="contained"
                                        sx={{ mt: 0, mb: 2, py: 1.5 }}>
                                        <FaGoogle />
                                    </Button>
                                )}
                                buttonText="Login"
                                onSuccess={props.onClickGoogleLogin}
                                onFailure={props.onClickGoogleLogin}
                                cookiePolicy={'single_host_origin'}
                            />
                            <Box sx={{ padding: 1 }} />
                            <Button
                                onClick={props.onClickGithubLogin}
                                color={"secondary"}
                                variant="contained"
                                sx={{ mt: 0, mb: 2, py: 1.5 }}>
                                <FaGithubSquare />
                            </Button>
                        </Box>
                    </Box>
                </Box>
                {NotifAuthComponent(props.state.notification)}
            </Container>
        </ThemeProvider>
    );
}
