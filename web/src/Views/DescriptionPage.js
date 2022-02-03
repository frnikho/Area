// import React from "react";
import { Button, createTheme, ThemeProvider, } from "@mui/material";
import Stack from '@mui/material/Stack';
import { withCookies } from "react-cookie";

import ControllerDescription from "../Controllers/ControllerDescription"
import Page from "./Page"
import DescriptionLogo from "../Resources/assets/87795-loading-success.gif";
import useStyles from "../Resources/Styles/styleDescription.js"


function RenderRegisterPage({ component }) {
    const theme = createTheme({
        palette: {
            type: "dark"
        }
    });
    const classes = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.title}>
                <div className={classes.titleLeft}>
                    <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }}>Epitech 2022 Project</Button>
                </div>
                <div className={classes.menuRight}>
                    <Stack direction="row" spacing={2}>
                        <Button style={{ fontFamily: 'Dongle', fontSize: '60px', textTransform: "none", color: "black" }} onClick={() => component.setRedirectUrl("/")}>
                            ←
                        </Button>
                    </Stack>
                </div>
            </div>
            <div className={classes.container}>
                <img style={{ width: '10%', height: '10%' }} src={DescriptionLogo} alt="loading..." />
                <div className={classes.rect}>
                    <div className={classes.description}>
                        What is Area ?
                        <div className={classes.littleSpace} />
                        Area is a web service that allows its users to create simple instruction strings called applets.
                        An applet is triggered by changes in web services such as Gmail, Discord or slack.
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )

}


export default withCookies(class DescriptionPage extends Page {

    constructor(props) {
        super(props);
        this.cookies = props;
        this.controllerDescription = new ControllerDescription(this.cookies, this);
    }

    render() {
        return (this.pageRender(this, RenderRegisterPage));
    }
})
