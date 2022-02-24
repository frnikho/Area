import React from "react";
import { Navigate } from "react-router-dom";

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

    redirectUrl() {
        return (
            <div>
                <Navigate to={this.state.redirectUrl.url} />
            </div>
        )
    }

    getUrl() { return this.state.redirectUrl }

    setRedirectUrl(url) {

        if (url && url.params)
            url.url += "/:" + url.params
        this.setState({ redirectUrl: url })
    }

    pageRender() {
    }

    render() {
        return (
            <div>
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl.url} /> : this.pageRender()}
            </div>
        )
    }

}
