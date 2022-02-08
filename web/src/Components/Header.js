import Button from '@mui/material/Button';
import Style from "../Resources/Styles/styleHeader"
import MenuDashboard from "./MenuDashboard"
import { Box } from "@mui/material";

export default function Header({ component, menu }) {

    return (
        <Box style={Style.title}>
            <Box style={Style.titleLeft}>
                <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>Epitech 2022 Project</Button>
            </Box>
            <MenuDashboard props={component} menu={menu} />
        </Box>
    )
}