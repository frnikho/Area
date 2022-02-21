import { withCookies } from "react-cookie";
import React from "react";

import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";
// import Style from "../../Resources/Styles/styleProfile"
import ControllerApplet from "../../Controllers/Area/ControllerApplet"
import AppletChildItemCard from "../../Components/AppletChildItemCard"

export default withCookies(class AppletsPage extends Page {

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
            this.setRedirectUrl({url: '/auth/login'})
        } else {
            this.setState({ user: this.authContext.getUser() })
        }
        this.controllerApplet = new ControllerApplet(this.authContext, this.cookies, this);
    }

    render() {
        if (!this.authContext)
        return (null);
        return (this.pageRender(this, function RenderProfilePage({ component }) {

            return (
                <AppletChildItemCard {...component.props} />
            );
        }));
    }
})