import React from "react";
import { withCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: undefined,
            notification: undefined,
        }
        this.setRedirectUrl = this.setRedirectUrl.bind(this)
        this.setNotification = this.setNotification.bind(this)
        this.redirectUrl = this.redirectUrl.bind(this)
    }

    setRedirectUrl(url) {
        this.setState({ redirectUrl: url })
    }

    setNotification(value) {
        this.setState({ notification: value });
    }

    redirectUrl() {
        return (
            <>
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl} /> : null}
            </>
        )
    }

}

export default withCookies(Controller);
