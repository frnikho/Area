import { withCookies } from "react-cookie";
import React from "react";

import Page from "../Page"
import { AuthContext } from "../../Contexts/AuthContext";
// import Style from "../../Resources/Styles/styleProfile"
import ControllerApplet from "../../Controllers/Area/ControllerApplet"
import AppletCard from "../../Components/AppletCard"
import PropTypes from "prop-types";

class AppletsPage extends Page {

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
            this.setRedirectUrl({ url: '/auth/login' })
        } else {
            this.setState({ user: this.authContext.getUser() })
        }
        this.controllerApplet = new ControllerApplet(this.authContext, this.cookies, this);
    }

    render() {
        if (!this.authContext)
            return (null);
        return (this.pageRender(this, function RenderDashboardPage({ component }) {
            return (
                <>
                    <AppletCard
                        title={component.props.applet.title}
                        color={component.props.applet.color}
                        description={component.props.applet.description}
                        ifIcon={component.props.applet.ifIcon}
                        thenIcon={component.props.applet.thenIcon}
                        author={component.props.applet.author}
                        appletStatus={component.props.applet.enable}
                        onClick={() => component.setRedirectUrl({ url: "/area/applets/property", params: component.props.applet.uuid })} />
                </>
            );
        }))
    }
};

AppletsPage.propTypes = {
    applet: PropTypes.object.isRequired,
}

export default withCookies(AppletsPage);
