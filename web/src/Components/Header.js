import Button from '@mui/material/Button';
import Style from "../Resources/Styles/styleHeader"
import MenuDashboard from "./MenuDashboard"
import { Box } from "@mui/material";

export default function Header({ component, menu }) {

    return (
        <Box sx={{ pb: 2, mx: 2 }} style={Style.bar}>
            <Box style={Style.menuLeft}>
                <Button
                    onClick={() => (menu.left.action && menu.left.action())}
                    style={menu.left.style || { fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>
                    {menu.left.name || "Epitech 2022 Project"}
                </Button>
            </Box>
            <Box sx={{ mt: 0 }} style={{...Style.centerMenu, ...{backgroundColor: "green"}}} />
            <Box style={Style.menuRight}>
                <MenuDashboard props={component} menu={menu.right} />
            </Box>
        </Box>
    )
}