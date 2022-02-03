import React from "react";
import { Navigate } from "react-router-dom";

export default class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: undefined,
            notification: undefined,
            showNotif: undefined
        }
        this.setRedirectUrl = this.setRedirectUrl.bind(this)
        this.setNotification = this.setNotification.bind(this)
        this.redirectUrl = this.redirectUrl.bind(this)
        this.getUrl = this.getUrl.bind(this)
        this.pageRender = this.pageRender.bind(this)
    }

    getUrl() { return this.state.redirectUrl }

    setRedirectUrl(url) { this.setState({ redirectUrl: url }) }

    setNotification(value) {
        this.setState({
            notification: value
        });
        setTimeout(() => this.setState({ notification: undefined }), 5000)
    }

    redirectUrl() {
        return (
            <>
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl} /> : null}
            </>
        )
    }

    pageRender(props, Page) {
        return (
            <div>
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl} /> : <Page {...props} />}
            </div>
        );

}

}