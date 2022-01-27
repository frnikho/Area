import React from "react";
import DashboardPage from "../../Views/Area/DashboardPage.js"
import { AuthContext } from "../../Contexts/AuthContext";
import { withCookies } from "react-cookie";
import { Navigate } from "react-router-dom";


class ControllerDashboard extends React.Component {

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
                <DashboardPage {...this} />
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl} /> : null}
            </div>
        );
    }

}

export default withCookies(ControllerDashboard);
