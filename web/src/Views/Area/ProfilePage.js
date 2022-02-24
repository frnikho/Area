import { withCookies } from "react-cookie";
import React from "react";
import { ThemeProvider, Box, CssBaseline } from "@mui/material";
import Button from '@mui/material/Button';
import { FaUser } from "react-icons/fa";

import ControllerProfile from "../../Controllers/Area/ControllerProfile"
import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";
import Style from "../../Resources/Styles/styleProfile"
import FieldSettings from "../../Components/FieldSettings"
import Header from "../../Components/Header"
import { theme } from "../../Resources/Styles/AppTheme";
import { withSnackbar } from "notistack";


export default withCookies(withSnackbar(class ProfilePage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            token: undefined,
            appletTitle: undefined,
        }
        this.cookies = props;
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() === undefined) {
            this.setRedirectUrl({ url: '/auth/login' })
        } else {
            this.setState({ user: this.authContext.getUser() })
            this.setState({ token: this.authContext.getToken() })
        }
        this.controllerProfile = new ControllerProfile(this.authContext, this.cookies, this);
    }

    handleSubmit(event, fieldName) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get(fieldName) === "")
            return this.props.enqueueSnackbar(fieldName + " cannot be empty !", { variant: 'error' });
        this.controllerProfile.updateProfile(this.state.token, data.get(fieldName), fieldName);
    }

    pageRender() {
        if (!this.authContext)
            return (null);
        const buttonMenu = { fontFamily: 'Dongle', fontSize: '30px', textTransform: "none", color: "white", margin: "auto" }
        const menu = {
            right: [
                {
                    name: 'Create',
                    style: Style.roundButtonFull,
                    variant: "contained",
                    action: () => this.setRedirectUrl({ url: "/area/applets/add" })
                },
                {
                    name: 'Services',
                    action: () => this.setRedirectUrl({ url: "/area/context" })
                },
                {
                    name: 'Profile',
                    redirectUrl: undefined
                }
            ],
            left: {
                action: () => this.setRedirectUrl({ url: "/area/dashboard" })
            }
        }

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header component={this} menu={menu} />
                <div style={Style.container}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', whiteSpace: "nowrap" }}>
                        <div>
                            <FaUser size={50} />
                        </div>
                        <Box sx={{ padding: 2 }} />
                        Account settings
                    </Box>
                </div>
                <div style={Style.accountContainer}>
                    Profile
                    <FieldSettings props={this} style={Style} fieldName={"First Name"} value={this.authContext.user.firstname} active={true} />
                    <FieldSettings props={this} style={Style} fieldName={"Last Name"} value={this.authContext.user.lastname} active={true} />
                    <FieldSettings props={this} style={Style} fieldName={"Email"} value={this.authContext.user.email} active={false} />
                    <div style={Style.little}>
                        Password
                        <div style={Style.little}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                •••••••••
                                <Box sx={{ padding: 1 }} />
                                {/* <Link to="/area/profile/changePassword" style={{ color: 'black', fontSize: '40px' }}>
                                    Change password ?
                                </Link> */}
                            </Box>
                        </div>
                    </div>
                </div>
                <Box sx={{ width: "125px", height: "75px", display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "0 auto", }}>
                    <Button variant="contained" color="error" style={buttonMenu} onClick={() => this.controllerProfile.logout()}>Logout</Button>
                </Box>
                <div style={Style.space} />
            </ThemeProvider >
        );
    };
}))