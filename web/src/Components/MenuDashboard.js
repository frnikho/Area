import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Style from "../Resources/Styles/styleMenuDashboard"

export default function MenuDashboard({ props, menu }) {

    function ButtonMenu({ buttonName, redirectUrl, key, style, variant }) {
        return (
            <Button
                variant={variant || "text"}
                style={style || Style.buttonMenu}
                key={key}
                onClick={() => props.setRedirectUrl(redirectUrl)}>
                {buttonName}
            </Button>
        )
    }

    return (
        <div style={Style.menuRight}>
            <Stack direction="row" spacing={4} display="flex" justifyContent="center" alignItems="center">
                {menu.map((button, id) => ButtonMenu({ buttonName: button.name, redirectUrl: button.redirectUrl, key: id, style: button.style, variant: button.variant}))}
            </Stack>
        </div>
    )
}