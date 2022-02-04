import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Style from "../Resources/Styles/styleMenuDashboard"

export default function MenuDashboard({ props, menu }) {

    function ButtonMenu({ buttonName, redirectUrl, key }) {
        return (
            <Button style={Style.buttonMenu} key={key} onClick={() => props.setRedirectUrl(redirectUrl)}>{buttonName}</Button>
        )
    }

    return (
        <div style={Style.menuRight}>
            <Stack direction="row" spacing={4}>
                {menu.map((button, id) => ButtonMenu({ buttonName: button.name, redirectUrl: button.redirectUrl, key: id }) )}
            </Stack>
        </div>
    )
}