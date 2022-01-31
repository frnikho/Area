import React from "react";
import { createTheme, ThemeProvider, Box, OutlinedInput, FormControl } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import useStyles from "../../Components/Styles/styleProfile"
import MenuDashboard from "../../Components/MenuDashboard"

const theme = createTheme({
    palette: {
        type: "dark"
    }
});

export default function ProfilePage(props) {

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
                <div className={classe.little}>
                    First Name
                </div>
                <Box component="form" noValidate autoComplete="off" sx={{ height: 80 }}>
                    <FormControl sx={{ width: '25ch' }}>
                        <OutlinedInput label="field" placeholder={props.authContext.user.firstname} />
                    </FormControl>
                </Box>
                <div className={classe.little}>
                    Last Name
                </div>
                <Box component="form" noValidate autoComplete="off" sx={{ height: 80 }}>
                    <FormControl sx={{ width: '25ch' }}>
                        <OutlinedInput placeholder={props.authContext.user.lastname} />
                    </FormControl>
                </Box>
                <div className={classe.little}>
                    Email
                </div>
                <Box component="form" noValidate autoComplete="off" sx={{ height: 80 }}>
                    <FormControl sx={{ width: '25ch' }}>
                        <OutlinedInput placeholder={props.authContext.user.email} />
                    </FormControl>
                </Box>
                <div className={classe.little}>
                    Password
                </div>
                <div className={classe.little}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        •••••••••
                        <Box sx={{ padding: 1 }} />
                        <Link to="/area/profile/changePassword" style={{color: 'black', fontSize: '40px'}}>
                            Change password ?
                        </Link>
                    </Box>
                </div>
            </div>
        </ThemeProvider >
    );
}
