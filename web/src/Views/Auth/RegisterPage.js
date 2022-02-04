// import React from "react";
import ControllerRegister from "../../Controllers/Auth/ControllerRegister"
import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";

import { Box, Button, Container, createTheme, ThemeProvider, TextField, Typography, } from "@mui/material";
import { Link } from "react-router-dom";
import { FaGoogle, FaGithubSquare } from "react-icons/fa";
import Stack from '@mui/material/Stack';

import RegisterLogo from "../../Resources/assets/38435-register.gif";
import Style from "../../Resources/Styles/styleAuth.js"
import OAuth2Login from 'react-simple-oauth2-login';
import { withCookies } from "react-cookie";

export default withCookies(class RegisterPage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.cookies = props;
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onClickGoogleLogin = this.onClickGoogleLogin.bind(this);
        this.onClickGithubLogin = this.onClickGithubLogin.bind(this);
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() !== undefined) {
            this.setRedirectUrl('/area/dashboard')
        }
        this.forceUpdate()
        this.controllerRegister = new ControllerRegister(this.authContext, this.cookies, this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.has('firstname') || data.get('firstname') === "")
            return this.setNotification({ message: "Firstname cannot be empty !", show: true, type: "error" });
        if (!data.has('lastname') || data.get('lastname') === "")
            return this.setNotification({ message: "Lastname cannot be empty !", show: true, type: "error" });
        if (!data.has('email') || data.get('email') === "")
            return this.setNotification({ message: "Email cannot be empty !", show: true, type: "error" });
        if (!data.has('password') || data.get('password') === "")
            return this.setNotification({ message: "Password cannot be empty !", show: true, type: "error" });
        if (!data.has('confpassword') || data.get('confpassword') === "" || data.get('confpassword') !== data.get('password'))
            return this.setNotification({ message: "Passwords are not the same !", show: true, type: "error" });
        this.controllerRegister.registerDb(data.get('email'), data.get('firstname'), data.get('lastname'), data.get('password'));
    }

    onClickGoogleLogin(response) {
        this.controllerRegister.googleLogin(response);
    }

    onClickGithubLogin(response) {
        this.controllerRegister.githubLogin(response);
    }

    render() {
        if (!this.authContext)
            return (null);
        return (this.pageRender(this, function RenderRegisterPage({ component }) {
            const theme = createTheme({
                palette: {
                    type: "dark"
                }
            });

            return (
                <ThemeProvider theme={theme}>
                    <div style={Style.title}>
                        <div style={Style.titleLeft}>
                            <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>Epitech 2022 Project</Button>
                        </div>
                        <div style={Style.menuRight}>
                            <Stack direction="row" spacing={2}>
                                <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }} onClick={() => component.setRedirectUrl("/description")}>Area</Button>
                            </Stack>
                        </div>
                    </div>
                    <Container component="main" maxWidth="xs">
                        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img style={{ borderRadius: 50, width: '50%', height: '50%' }} src={RegisterLogo} alt="loading..." />
                            <Box sx={{ mb: 2 }}>
                                <Typography style={{ fontFamily: "Dongle", fontSize: 70 }} component="h1" variant="h4">
                                    Register
                                </Typography>
                            </Box>
                            <Box component="form" onSubmit={component.handleSubmit} noValidate sx={{ mt: 1 }}>
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
                                        onSuccess={() => component.onClickGoogleLogin}
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
                                        onSuccess={() => component.onClickGithubLogin}
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
                        {component.notificationComponent()}
                    </Container>
                </ThemeProvider>
            )
        }));
    }
})
