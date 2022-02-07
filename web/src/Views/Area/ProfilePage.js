import { withCookies } from "react-cookie";
import React from "react";
import { createTheme, ThemeProvider, Box } from "@mui/material";
import Button from '@mui/material/Button';
import { FaUser } from "react-icons/fa";

import ControllerProfile from "../../Controllers/Area/ControllerProfile"
import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";
import Style from "../../Resources/Styles/styleProfile"
import MenuDashboard from "../../Components/MenuDashboard"
import FieldSettings from "../../Components/FieldSettings"


const menu = [
    {
        name: 'Area',
        redirectUrl: "/description"
    },
    {
        name: 'My applets',
        redirectUrl: "/area/dashboard"
    }
]

export default withCookies(class ProfilePage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
        }
        this.cookies = props;
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() === undefined) {
            this.setRedirectUrl('/auth/login')
        } else {
            this.setState({
                user: this.authContext.getUser()
            })
        }
        this.controllerProfile = new ControllerProfile(this.authContext, this.cookies, this);
    }

    handleSubmit(event, fieldName) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get(fieldName) === "")
            return this.setNotification({ message: fieldName + " cannot be empty !", show: true, type: "error" });
        this.controllerProfile.updateProfile(data.get(fieldName), fieldName);


    }

    render() {
        if (!this.authContext)
            return (null);
        return (this.pageRender(this, function RenderProfilePage({ component }) {

            const theme = createTheme({ palette: { type: "dark" } });
            const buttonMenu = { fontFamily: 'Dongle', fontSize: '30px', textTransform: "none", color: "white", margin: "auto" }

            return (
                <ThemeProvider theme={theme}>
                    <div style={Style.title}>
                        <div style={Style.titleLeft}>
                            <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>Epitech 2022 Project</Button>
                        </div>
                        <MenuDashboard props={component} menu={menu} />
                    </div>
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
                        <FieldSettings props={component} style={Style} fieldName={"First Name"} value={component.authContext.user.firstname} active={false} />
                        <FieldSettings props={component} style={Style} fieldName={"Last Name"} value={component.authContext.user.lastname} active={false} />
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
                    <div style={Style.space} />
                    <Box sx={{ width: "125px", height: "75px", display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "0 auto", }}>
                        <Button variant="contained" color="error" style={buttonMenu} onClick={() => component.controllerProfile.logout()}>Logout</Button>
                    </Box>
                    <div style={Style.space} />
                </ThemeProvider >
            );
        }));
    }
})