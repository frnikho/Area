import { ThemeProvider, } from "@mui/material";
import { withCookies } from "react-cookie";

import ControllerDescription from "../Controllers/ControllerDescription"
import Page from "./Page"
import DescriptionLogo from "../Resources/assets/87795-loading-success.gif";
import Style from "../Resources/Styles/styleDescription.js"
import Header from "../Components/Header"
import { theme } from "../Resources/Styles/AppTheme"

const menu = {
    right: [
        {
            name: '←',
            redirectUrl: "/"
        },
    ],
    left: {
    }
}

export default withCookies(class DescriptionPage extends Page {

    constructor(props) {
        super(props);
        this.cookies = props;
        this.controllerDescription = new ControllerDescription(this.cookies, this);
    }

    render() {
        return (this.pageRender(this, function RenderRegisterPage({ component }) {
            return (
                <ThemeProvider theme={theme}>
                    <Header component={component} menu={menu} />
                    <div style={Style.container}>
                        <img style={{ width: '10%', height: '10%' }} src={DescriptionLogo} alt="loading..." />
                        <div style={Style.rect}>
                            <div style={Style.description}>
                                What is Area ?
                                <div style={Style.littleSpace} />
                                Area is a web service that allows its users to create simple instruction strings called applets.
                                An applet is triggered by changes in web services such as Gmail, Discord or slack.
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            )
        }
        ));
    }
})
