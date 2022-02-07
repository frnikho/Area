import Button from '@mui/material/Button';
import Style from "../Resources/Styles/styleHeader"
import MenuDashboard from "./MenuDashboard"

export default function Header({ component, menu }) {

    return (
        <div style={Style.title}>
            <div style={Style.titleLeft}>
                <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>Epitech 2022 Project</Button>
            </div>
            <MenuDashboard props={component} menu={menu} />
        </div>
    )
}