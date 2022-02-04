import { withCookies } from "react-cookie";
import React from "react";
import {FaDiscord, FaGithubSquare, FaSlack, FaMarker} from "react-icons/fa";
import {Box, Paper, Typography} from "@mui/material";

import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";
// import Style from "../../Resources/Styles/styleProfile"
import ControllerService from "../../Controllers/Area/ControllerService"

export default withCookies(class ServicePage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
        }
        this.cookies = props.cookies;
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() === undefined) {
            this.setRedirectUrl('/auth/login')
        } else {
            this.setState({ user: this.authContext.getUser() })
        }
        this.controllerService = new ControllerService(this.authContext, this.cookies, this);
    }

    showIcon(component) {

        const DEFAULT_ICON_SIZE = 50;

        if (component.props.service.name === 'Github') {
            return <FaGithubSquare size={DEFAULT_ICON_SIZE} color={"white"} />
        } else if (component.props.service.name === 'Slack') {
            return <FaSlack size={DEFAULT_ICON_SIZE} color={"white"} />
        } else if (component.props.service.name === 'Intra Epitech') {
            return <FaMarker size={DEFAULT_ICON_SIZE} color={"white"} />
        } else if (component.props.service.name === "Discord") {
            return <FaDiscord size={DEFAULT_ICON_SIZE} color={"white"} />
        }
    }

    render() {
        if (!this.authContext)
        return (null);
        return (this.pageRender(this, function RenderProfilePage({ component }) {

            return (
                <Box sx={{ mt: 2 }}>
                    <Paper elevation={0} style={{ backgroundColor: '#e74c3c' }}>
                        <Box sx={{ py: 4 }}>
                            {component.showIcon(component)}
                            <br />
                            <Box sx={{ mt: 2 }}>
                                <Typography component={"h2"} variant={"h5"} color={"white"} fontWeight={"800"}>
                                    {component.props.service.name}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            );
        }));
    }
})