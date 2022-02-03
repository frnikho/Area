// import React from "react";
import { Button, createTheme, ThemeProvider, } from "@mui/material";
import Stack from '@mui/material/Stack';
import { withCookies } from "react-cookie";

import ControllerDescription from "../Controllers/ControllerDescription"
import Page from "./Page"
import DescriptionLogo from "../Resources/assets/87795-loading-success.gif";
import Style from "../Resources/Styles/styleDescription.js"


export default withCookies(class DescriptionPage extends Page {

    constructor(props) {
        super(props);
        this.cookies = props;
        this.controllerDescription = new ControllerDescription(this.cookies, this);
    }

    render() {
        return (this.pageRender(this, function RenderRegisterPage({ component }) {
            const theme = createTheme({
                palette: {
                    type: "dark"
                }
            });

            return (
                <ThemeProvider theme={theme}>
                    <div style={Style.title}>
                        <div style={Style.titleLeft}>
                            <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>Epitech 2022 Project</Button>
                        </div>
                        <div style={Style.menuRight}>
                            <Stack direction="row" spacing={2}>
                                <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }} onClick={() => component.setRedirectUrl("/")}>
                                    ←
                                </Button>
                            </Stack>
                        </div>
                    </div>
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
