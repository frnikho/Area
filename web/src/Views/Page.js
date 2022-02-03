import React from "react";
import { Navigate } from "react-router-dom";
import NotifComponent from "../Components/utils/NotifComponent"

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
        this.notificationComponent = this.notificationComponent.bind(this)
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

    notificationComponent() {
        if (this.state.notification === undefined || this.state.notification.message === "" || this.state.notification.show === false)
            return (null);
        return (NotifComponent(this.state.notification))
    }

    redirectUrl() {
        return (
            <>
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl} /> : null}
            </>
        )
    }

    pageRender(component, Page) {
        return (
            <div>
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl} /> : <Page component={component} />}
            </div>
        );
    }

    render() {
        return (null)
    }

}