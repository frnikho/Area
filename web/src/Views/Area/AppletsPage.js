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
        this.renderAppletsPage = this.renderAppletsPage.bind(this)
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

    renderAppletsPage() {
        if (!this.authContext)
            return (null);
        return (
            <>
                <AppletCard
                    title={this.props.applet.title}
                    color={this.props.applet.color}
                    description={this.props.applet.description}
                    ifIcon={this.props.applet.ifIcon}
                    thenIcon={this.props.applet.thenIcon}
                    author={this.props.applet.author}
                    appletStatus={this.props.applet.enable}
                    onClick={() => this.setRedirectUrl({ url: "/area/applets/property", params: this.props.applet.uuid })} />
            </>
        );
    }

    render() {
        return(this.pageRender(this.renderAppletsPage))
    }
};

AppletsPage.propTypes = {
    applet: PropTypes.object.isRequired,
}

export default withCookies(AppletsPage);
