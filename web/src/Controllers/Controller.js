import React from "react";
import { Navigate } from "react-router-dom";

export default class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: undefined,
            notification: undefined,
        }
        this.setRedirectUrl = this.setRedirectUrl.bind(this)
        this.setNotification = this.setNotification.bind(this)
        this.redirectUrl = this.redirectUrl.bind(this)
        this.getUrl = this.getUrl.bind(this)
    }

    getUrl() { return this.url }

    setRedirectUrl(url) { this.setState({ redirectUrl: url }) }

    setNotification(value) { this.setState({ notification: value }) }

    redirectUrl() {
        return (
            <>
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl} /> : null}
            </>
        )
    }

}