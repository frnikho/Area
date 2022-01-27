import React from "react";
import DescriptionPage from "../Views/DescriptionPage"
import { withCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import Controller from "./Controller"

class ControllerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: undefined,
        }
        this.setRedirectUrl = this.setRedirectUrl.bind(this)
    }

    setRedirectUrl(url) {
        this.setState({ redirectUrl: url })
    }

    render() {
        return (
            <div>
                <DescriptionPage {...this} />
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl} /> : null}
            </div>
        );
    }

}

export default withCookies(ControllerDashboard);
