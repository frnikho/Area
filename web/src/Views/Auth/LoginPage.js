import React from "react";
import Lottie from "lottie-react";
import { Box, Button, Checkbox, Container, createTheme, ThemeProvider, FormControlLabel, TextField, Typography, } from "@mui/material";
import { Link } from "react-router-dom";
import { FaGoogle, FaGithubSquare } from "react-icons/fa";

import NotifAuthComponent from "../../Components/utils/NotifAuthComponent"
import * as logo from "../../Resources/assets/login.json"
import style from "../../Resources/CSS/LoginPage.css";

const theme = createTheme({
    palette: {
        type: "dark"
    }
});

export default function LoginPage(props) {

    return (
        <ThemeProvider theme={theme}>
            <div className="titleLeft">
                Epitech 2022 Project
            </div>
            <div className="titleRight">
                Area
            </div>
            <div className="space" />
            <Container component="main" maxWidth="xs">
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Lottie animationData={logo} style={{ height: 200 }} />
                    <Box sx={{ mb: 2 }}>
                        <Typography style={{ fontFamily: "Dongle", fontSize: 70 }} component="h1" variant="h4">
                            Log in
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={(e) => props.handleSubmit(e)} noValidate sx={{ mt: 1 }}>
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me" />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }} >
                            Log in
                        </Button>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <GoogleLogin
                                clientId={process.env.GOOGLE_CLIENT_ID}
                                render={renderProps => (
                                    <FaGoogle onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                        Log In
                                    </FaGoogle>
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
                        <div style={{ textAlign: "center" }}>
                            <Link to="/auth/register">
                                First connection? Sign Up
                            </Link>
                        </div>
                    </Box>
                </Box>
                {NotifAuthComponent(props.state.notification)}
            </Container>
        </ThemeProvider>
    );
}
