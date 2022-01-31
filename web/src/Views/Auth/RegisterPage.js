import React from "react";
import { Box, Button, Container, createTheme, ThemeProvider, TextField, Typography, } from "@mui/material";
import { FaGoogle, FaGithubSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import OAuth2Login from 'react-simple-oauth2-login';
import Stack from '@mui/material/Stack';

import NotifComponent from "../../Components/utils/NotifComponent"
import RegisterLogo from "../../Resources/assets/38435-register.gif";
import useStyles from "../../Components/Styles/styleAuth.js"

const theme = createTheme({
    palette: {
        type: "dark"
    }
});

export default function RegisterPage(props) {

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
                    <img style={{ borderRadius: 50, width: '50%', height: '50%' }} src={RegisterLogo} alt="loading..." />
                    <Box sx={{ mb: 2 }}>
                        <Typography style={{ fontFamily: "Dongle", fontSize: 70 }} component="h1" variant="h4">
                            Register
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={props.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            autoFocus
                            margin="normal"
                            required
                            fullWidth
                            name="firstname"
                            label="Firstname"
                            type="firstname"
                            id="firstname" />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="lastname"
                            label="Lastname"
                            type="lastname"
                            id="lastname" />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
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
                            <Link to="/auth/login">
                                Already have an account? Log in
                            </Link>
                        </div>
                    </Box>
                </Box>
                <Box sx={{ padding: 1 }} />
                {NotifComponent(props.state.notification)}
            </Container>
        </ThemeProvider>
    );
}
