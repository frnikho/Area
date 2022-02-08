import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Style from "../Resources/Styles/styleMenuDashboard"
import { Box } from "@mui/material";


export default function MenuDashboard({ props, menu }) {

    function ButtonMenu({ menu, key }) {
        return (
            <Button
                variant={menu.variant || "text"}
                style={menu.style || Style.buttonMenu}
                key={key}
                onClick={() => (menu.action && menu.action())}>
                {menu.name}
            </Button>
        )
    }

    return (
        <Box style={Style.menuRight}>
            <Stack direction="row" spacing={4} display="flex" justifyContent="center" alignItems="center">
                {menu.map((menu, id) => ButtonMenu({ menu, key: id, }))}
            </Stack>
        </Box>
    )
}