import React from "react";
import Lottie from "lottie-react";
import { Box, Button, Checkbox, Container, createTheme, ThemeProvider, FormControlLabel, TextField, Typography, } from "@mui/material";
import { Link } from "react-router-dom";
import { FaGoogle, FaGithubSquare } from "react-icons/fa";
import Stack from '@mui/material/Stack';

import NotifComponent from "../../Components/utils/NotifComponent"
import * as logo from "../../Resources/assets/login.json"
import useStyles from "../../Resources/Styles/styleAuth.js"
import OAuth2Login from 'react-simple-oauth2-login';

const theme = createTheme({
    palette: {
        type: "dark"
    }
});

export default function LoginPage(props) {

    const classe = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <div className={classe.title}>
                <div className={classe.titleLeft}>
                    <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>Epitech 2022 Project</Button>
                </div>
                <div className={classe.menuRight}>
                    <Stack direction="row" spacing={2}>
                        <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }} onClick={() => props.setRedirectUrl("/description")}>Area</Button>
                    </Stack>
                </div>
            </div>
            {/* <div className={classe.space} /> */}
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
                            <OAuth2Login
                                authorizationUrl="https://accounts.google.com/o/oauth2/v2/auth"
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                responseType="code"
                                scope={"openid%20profile%20email&"}
                                redirectUri={process.env.REACT_APP_GOOGLE_REDIRECT_URL}
                                onSuccess={() => props.onClickGoogleLogin}
                                onFailure={(abc) => console.error(abc)}
                                buttonText={"Google"}
                                render={renderProps => (
                                    <Button
                                        onClick={renderProps.onClick}
                                        color={"error"}
                                        variant="contained"
                                        sx={{ mt: 0, mb: 2, py: 1.5 }}>
                                        <FaGoogle />
                                    </Button>
                                )}
                            />
                            <Box sx={{ padding: 1 }} />
                            <OAuth2Login
                                authorizationUrl="https://github.com/login/oauth/authorize"
                                clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
                                responseType="code"
                                scope={"user:email"}
                                redirectUri={process.env.REACT_APP_GITHUB_REDIRECT_URL}
                                onSuccess={() => props.onClickGithubLogin}
                                onFailure={(abc) => console.error(abc)}
                                buttonText={"Github"}
                                render={renderProps => (
                                    <Button
                                        onClick={renderProps.onClick}
                                        color={"secondary"}
                                        variant="contained"
                                        sx={{ mt: 0, mb: 2, py: 1.5 }}>
                                        <FaGithubSquare />
                                    </Button>
                                )}
                            />
                        </Box>
                        <div style={{ textAlign: "center" }}>
                            <Link to="/auth/register">
                                First connection? Sign Up
                            </Link>
                        </div>
                    </Box>
                </Box>
                <Box sx={{ padding: 1 }} />
                {NotifComponent(props.state.notification)}
            </Container>
        </ThemeProvider >
    );
}
