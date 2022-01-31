import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import useStyles from "../Components/Styles/styleMenuDashboard"

export default function MenuDashboard({ props }) {

    const buttonMenu = {
        fontFamily: 'Dongle', fontSize: '50px', textTransform: "none", color: "black"
    }

    const classe = useStyles()

    return (
        <div className={classe.menuRight}>
            <Stack direction="row" spacing={4}>
                <Button style={buttonMenu} onClick={() => props.setRedirectUrl("/description")}>Area</Button>
                <Button style={buttonMenu} onClick={() => props.setRedirectUrl("/area/dashboard")}>My board</Button>
                <Button style={buttonMenu} onClick={() => props.setRedirectUrl("/area/profile")}>Profile</Button>
                {/* <Button style={buttonMenu } onClick={() => props.logout()}>Logout</Button> */}
            </Stack>
        </div>
    )
}