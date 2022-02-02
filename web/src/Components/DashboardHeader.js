import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {Box, Typography} from "@mui/material";
import {AuthContext} from "../Contexts/AuthContext";
import {withCookies} from "react-cookie";
import { Navigate } from "react-router-dom";


const styles = {
    font: {
        fontFamily: "Dongle",
    },
    background: {
        backgroundColor: "#8c8c8c",
    },
    container: {
        margin: "0 auto",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "Dongle",
        fontSize: "60px",
    },
    titleRight: {
        fontFamily: "Dongle",
        fontSize: "60px",
        position: "absolute",
        top: "0",
        right: "0",
        textAlign: "center",
        justifyContent: "center",
        marginRight: "30px",
    },
    menuRight: {
        paddingLeft: "12px",
        paddingRight: "12px",
        fontFamily: "Dongle",
        color: "white",
        borderRadius: "30px",
        fontSize: "60px",
        position: "relative",
        textAlign: "right",
        justifyContent: "right",
        alignItems: "right",
        display: "flex",
        flex: "1",
    },
    titleLeft: {
        fontFamily: "Dongle",
        fontSize: "60px",
        position: "relative",
        textAlign: "left",
        justifyContent: "left",
        marginLeft: "30px",
        display: "flex",
        flex: "2",
    },
    title: {
        justifyContent: "justify",
        alignItems: "justify",
        display: "flex",
    },

    space: {
        margin: "125px",
    }
}

class DashboardHeader extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: undefined,
        }
    }

    componentDidMount() {
        this.auth = this.context;
    }

    redirect(url) {
        this.setState({
            redirectUrl: url
        })
    }

    logout() {
        const { cookies } = this.props;
        cookies.remove('session', {path: '/'})
        this.authContext.setUser(undefined)
        this.redirect("/");
    }

    render() {
        return (
            <Box style={styles.title}>
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl}/> : null }
                <div style={styles.titleLeft}>
                    <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>Epitech 2022 Project</Button>
                </div>
                <div style={styles.menuRight}>
                    <Stack direction="row" spacing={2}>
                        <Button>
                            <Typography fontFamily={"Dongle"} color={"black"} fontSize={40} textTransform={"none"}>
                                Create
                            </Typography>
                        </Button>
                        <Box sx={{px: 4}}/>
                        <Button style={{ fontFamily: 'Dongle', fontSize: '40px', textTransform: "none", color: "black" }} onClick={() => this.redirect("/description")}>Area</Button>
                        <Button style={{ fontFamily: 'Dongle', fontSize: '40px', textTransform: "none", color: "black" }} onClick={() => this.logout()}>Logout</Button>
                    </Stack>
                </div>
            </Box>
        );
    }
}

export default withCookies(DashboardHeader)
