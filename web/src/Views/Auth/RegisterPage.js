import { Box, Button, Container, ThemeProvider, TextField, Typography, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";
import { FaGoogle, FaGithubSquare } from "react-icons/fa";
import implement from 'implement-js'

import { RegisterModel } from "../../Models/ModelAuth"
import ControllerRegister from "../../Controllers/Auth/ControllerRegister"
import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";
import RegisterLogo from "../../Resources/assets/38435-register.gif";
import OAuth2Login from 'react-simple-oauth2-login';
import { withCookies } from "react-cookie";
import Header from "../../Components/Header"
import { theme } from "../../Resources/Styles/AppTheme";
import { withSnackbar } from "notistack";

export default withCookies(withSnackbar(class RegisterPage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.cookies = props;
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onClickGoogleLogin = this.onClickGoogleLogin.bind(this);
        this.onClickGithubLogin = this.onClickGithubLogin.bind(this);
        this.renderRegisterPage = this.renderRegisterPage.bind(this)
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() !== undefined) {
            this.setRedirectUrl({ url: '/area/dashboard' })
        }
        this.forceUpdate()
        this.controllerRegister = new ControllerRegister(this.authContext, this.cookies, this);
    }

    handleSubmit(event) {
        event.preventDefault();

        try {
            const data = new FormData(event.currentTarget);
            const registerId = implement(RegisterModel)({
                email: data.get('email'),
                firstName: data.get('firstname'),
                lastName: data.get('lastname'),
                password: data.get('password'),
                confpassword: data.get('confpassword')
            })

            if ([registerId.firstName, registerId.lastName, registerId.email, registerId.password, registerId.confpassword].includes(""))
                return this.props.enqueueSnackbar(["First Name", "Last Name", "Email", "Password", "Confirm Password"][[registerId.firstName, registerId.lastName, registerId.email, registerId.password, registerId.confpassword].indexOf("")] + " cannot be empty !", { variant: 'error' });
            if (registerId.confpassword !== registerId.password)
                return this.props.enqueueSnackbar("Passwords are not the same !", { variant: 'error' });
            this.controllerRegister.registerDb(registerId);
        } catch (e) {
            return this.props.enqueueSnackbar(e.message.split('\'')[5] + " cannot be empty !", { variant: 'error' });
        }
    }

    onClickGoogleLogin(response) {
        this.controllerRegister.googleLogin(response);
    }

    onClickGithubLogin(response) {
        this.controllerRegister.githubLogin(response);
    }

    renderRegisterPage() {
        if (!this.authContext)
            return (null);

        const menu = {
            right: [
                {
                    name: 'Area',
                    action: () => this.setRedirectUrl({ url: "/description" })
                },
            ],
            left: {
            }
        }
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header component={this} menu={menu} />
                <Container component="main" maxWidth="xs">
                    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img style={{ borderRadius: 50, width: '50%', height: '50%' }} src={RegisterLogo} alt="loading..." />
                        <Box sx={{ mb: 2 }}>
                            <Typography style={{ fontFamily: "Dongle", fontSize: 70 }} component="h1" variant="h4">
                                Register
                            </Typography>
                        </Box>
                        <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
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
                                    onSuccess={() => this.onClickGoogleLogin}
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
                                    onSuccess={() => this.onClickGithubLogin}
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
                </Container>
            </ThemeProvider>
        )
    }

    render() {
        return(this.pageRender(this.renderRegisterPage))
    }
}))
