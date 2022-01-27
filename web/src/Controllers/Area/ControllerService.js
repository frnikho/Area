import React from "react";
import ServicePage from "../../Views/ServicePage.js"
import { AuthContext } from "../../Contexts/AuthContext";
import { withCookies } from "react-cookie";
import { Navigate } from "react-router-dom";


class ControllerService extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            notification: undefined,
            redirectUrl: undefined,
        }
        this.cookies = props;
        this.setRedirectUrl = this.setRedirectUrl.bind(this)
        this.setNotification = this.setNotification.bind(this)
        this.name = props.name
        this.color = props.color
    }

    componentDidMount() {
        this.auth = this.context;
    }

    setRedirectUrl(url) {
        this.setState({ redirectUrl: url })
    }

    setNotification(value) {
        this.setState({ notification: value });
    }

    render() {
        return (
            <div>
                <ServicePage {...this} />
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl} /> : null}
            </div>
        );
    }

}

export default withCookies(ControllerService);
