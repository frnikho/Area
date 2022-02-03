// import React from "react";
import ControllerLogin from "../../Controllers/Auth/ControllerLogin"
import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";

import Lottie from "lottie-react";
import { Box, Button, Checkbox, Container, createTheme, ThemeProvider, FormControlLabel, TextField, Typography, } from "@mui/material";
import { Link } from "react-router-dom";
import { FaGoogle, FaGithubSquare } from "react-icons/fa";
import Stack from '@mui/material/Stack';
import NotifComponent from "../../Components/utils/NotifComponent"
import * as logo from "../../Resources/assets/login.json"
import useStyles from "../../Resources/Styles/styleAuth.js"
import OAuth2Login from 'react-simple-oauth2-login';
import { withCookies } from "react-cookie";


function RenderLoginPage({ component }) {
    const theme = createTheme({
        palette: {
            type: "dark"
        }
    });
    const classes = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.title}>
                <div className={classes.titleLeft}>
                    <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>Epitech 2022 Project</Button>
                </div>
                <div className={classes.menuRight}>
                    <Stack direction="row" spacing={2}>
                        <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }} onClick={() => component.setRedirectUrl("/description")}>Area</Button>
                    </Stack>
                </div>
            </div>
            <Container component="main" maxWidth="xs">
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Lottie animationData={logo} style={{ height: 200 }} />
                    <Box sx={{ mb: 2 }}>
                        <Typography style={{ fontFamily: "Dongle", fontSize: 70 }} component="h1" variant="h4">
                            Log in
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={(e) => component.handleSubmit(e)} noValidate sx={{ mt: 1 }}>
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
                                onSuccess={() => component.onClickGoogleLogin}
                                onFailure={(abc) => console.error(abc)}
                                buttonText={"Google"}
                                render={renderProps => (
                                    <Button
                                        onClick={component.onClick}
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
                                        onClick={component.onClick}
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
                {NotifComponent(component.state.notification)}
            </Container>
        </ThemeProvider >
    )

}


export default withCookies(class PageLogin extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.cookies = props;
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onClickGoogleLogin = this.onClickGoogleLogin.bind(this);
        this.onClickGithubLogin = this.onClickGithubLogin.bind(this);
    }

    componentDiMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() !== undefined) {
            this.setRedirectUrl('/area/dashboard')
        }
        this.controllerLogin = new ControllerLogin(this.authContext, this.cookies, this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.has('email') || data.get('email') === "")
            return this.setNotification({ message: "Email cannot be empty !", show: true, type: "error" });
        if (!data.has('password') || data.get('password') === "")
            return this.setNotification({ message: "Password cannot be empty !", show: true, type: "error" });
        this.controllerLogin.loginDb(data.get('email'), data.get('password'));
    }

    onClickGoogleLogin(response) {
        this.controllerLogin.googleLogin(response);
    }

    onClickGithubLogin(response) {
        this.controllerLogin.githubLogin(response);
    }

    render() {
        if (!this.authContext)
            this.componentDiMount()
        return (this.pageRender(this, RenderLoginPage));
    }
})
