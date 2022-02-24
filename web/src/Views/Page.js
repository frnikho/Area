import React from "react";
import { Navigate } from "react-router-dom";
import NotifComponent from "../Components/NotifComponent"

export default class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: undefined,
            showNotif: undefined
        }
        this.setRedirectUrl = this.setRedirectUrl.bind(this)
        this.getUrl = this.getUrl.bind(this)
        this.pageRender = this.pageRender.bind(this)
    }

    getUrl() { return this.state.redirectUrl }

    setRedirectUrl(url) {

        if (url && url.params)
            url.url += "/:" + url.params
        this.setState({ redirectUrl: url })
    }

    pageRender(component, Page) {
        return (
            <div>
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl.url} /> : <Page component={component} />}
            </div>
        );
    }

    render() {
        return (null)
    }

}
