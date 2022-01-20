import React from "react";
import { Box, Button, Checkbox, Container, createTheme, ThemeProvider, FormControlLabel, TextField, Typography, } from "@mui/material";
import { Link } from "react-router-dom";
import { FaGoogle, FaGithubSquare } from "react-icons/fa";

import RegisterLogo from "../../Resources/assets/38435-register.gif";

const theme = createTheme({
    palette: {
        type: "dark"
    }
});

export default function RegisterPage(props) {

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
                            id="username"
                            label="Username"
                            name="username"
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }} >
                            Sign In
                        </Button>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                                onClick={props.onClickGoogleLogin}
                                color={"error"}
                                variant="contained"
                                sx={{ mt: 0, mb: 2, py: 1.5 }}>
                                <FaGoogle />
                            </Button>
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
            </Container>
        </ThemeProvider>
    );
}
