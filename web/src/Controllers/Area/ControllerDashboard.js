import React from "react";
import DashboardPage from "../../Views/Area/DashboardPage.js"
import { AuthContext } from "../../Contexts/AuthContext";
import { withCookies } from "react-cookie";
import Controller from "../Controller"

class ControllerDashboard extends Controller {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
        }
        this.cookies = props;
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        this.auth = this.context;
        if (this.auth.getUser() === undefined) {
            this.setRedirectUrl('/auth/login')
        } else {
            this.setState({
                user: this.auth.getUser()
            })
        }
    }

    logout() {
        const { cookies } = this.props;
        cookies.remove('session', { path: '/' })
        this.auth.setUser(undefined)
        this.setRedirectUrl("/")
    }

    render() {
        return (
            <div>
                <DashboardPage {...this} />
                {this.redirectUrl()}
            </div>
        );
    }

}

export default withCookies(ControllerDashboard);
