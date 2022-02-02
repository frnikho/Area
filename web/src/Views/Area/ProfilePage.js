import React from "react";
import { createTheme, ThemeProvider, Box } from "@mui/material";
import { FaUser } from "react-icons/fa";

import Button from '@mui/material/Button';
import useStyles from "../../Resources/Styles/styleProfile"
import MenuDashboard from "../../Components/MenuDashboard"
import FieldSettings from "../../Components/FieldSettings"

const theme = createTheme({
    palette: {
        type: "dark"
    }
});

export default function ProfilePage(props) {

    const buttonMenu = {
        fontFamily: 'Dongle', fontSize: '30px', textTransform: "none", color: "white", margin: "auto"
    }

    const classe = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <div className={classe.title}>
                <div className={classe.titleLeft}>
                    <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>Epitech 2022 Project</Button>
                </div>
                <MenuDashboard props={props} />
            </div>
            <div className={classe.container}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <FaUser size={50} />
                    </div>
                    <Box sx={{ padding: 2 }} />
                    Account settings
                </Box>
            </div>
            <div className={classe.accountContainer}>
                Profile
                <FieldSettings {...{classe: classe, fieldName: "First Name", value: props.authContext.user.firstname}}/>
                <FieldSettings {...{classe: classe, fieldName: "Last Name", value: props.authContext.user.lastname}}/>
                <FieldSettings {...{classe: classe, fieldName: "Email", value: props.authContext.user.email}}/>
                <div className={classe.little}>
                    Password
                    <div className={classe.little}>
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
            <div className={classe.space} />
            <Box sx={{ width: "125px", height: "75px", display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "0 auto", }}>
                <Button variant="contained" color="error" style={buttonMenu} onClick={() => props.logout()}>Logout</Button>
            </Box>
            <div className={classe.space} />
        </ThemeProvider >
    );
}
