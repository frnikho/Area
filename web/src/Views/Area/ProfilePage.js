import { withCookies } from "react-cookie";
import React from "react";
import { ThemeProvider, Box } from "@mui/material";
import Button from '@mui/material/Button';
import { FaUser } from "react-icons/fa";

import ControllerProfile from "../../Controllers/Area/ControllerProfile"
import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";
import Style from "../../Resources/Styles/styleProfile"
import FieldSettings from "../../Components/FieldSettings"
import Header from "../../Components/Header"
import { theme } from "../../Resources/Styles/AppTheme";

export default withCookies(class ProfilePage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            token: undefined
        }
        this.cookies = props;
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() === undefined) {
            this.setRedirectUrl('/auth/login')
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
            return this.setNotification({ message: fieldName + " cannot be empty !", show: true, type: "error" });
        this.controllerProfile.updateProfile(this.state.token, data.get(fieldName), fieldName);
    }

    render() {
        if (!this.authContext)
            return (null);
        return (this.pageRender(this, function RenderProfilePage({ component }) {


            const menu = {
                right: [
                    {
                        name: 'Create',
                        style: {
                            paddingTop: "6px",
                            background: "black",
                            height: "50%",
                            borderRadius: '50px',
                            borderColor: 'white',
                            fontFamily: 'Dongle',
                            fontSize: '45px',
                            textTransform: "none",
                            color: "white"
                        },
                        variant: "contained",
                        action: () => component.setRedirectUrl("/area/applets")
                    },
                    {
                        name: 'Area',
                        action: () => component.setRedirectUrl("/description")
                    },
                    {
                        name: 'My applets',
                        action: () => component.setRedirectUrl("/area/dashboard")
                    },
                    {
                        name: 'Profile',
                        redirectUrl: undefined
                    }
                ],
                left: {
                }
            }
            const buttonMenu = { fontFamily: 'Dongle', fontSize: '30px', textTransform: "none", color: "white", margin: "auto" }

            return (
                <ThemeProvider theme={theme}>
                    <Header component={component} menu={menu} />
                    <div style={Style.container}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                                <FaUser size={50} />
                            </div>
                            <Box sx={{ padding: 2 }} />
                            Account settings
                        </Box>
                    </div>
                    <div style={Style.accountContainer}>
                        Profile
                        <FieldSettings props={component} style={Style} fieldName={"First Name"} value={component.authContext.user.firstname} active={true} />
                        <FieldSettings props={component} style={Style} fieldName={"Last Name"} value={component.authContext.user.lastname} active={true} />
                        <FieldSettings props={component} style={Style} fieldName={"Email"} value={component.authContext.user.email} active={false} />
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
                    <Box sx={{ width: "225px", height: "75px", display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "0 auto", }}>
                        {component.notificationComponent()}
                    </Box>
                    <Box sx={{ width: "125px", height: "75px", display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "0 auto", }}>
                        <Button variant="contained" color="error" style={buttonMenu} onClick={() => component.controllerProfile.logout()}>Logout</Button>
                    </Box>
                    <div style={Style.space} />
                </ThemeProvider >
            );
        }));
    }
})