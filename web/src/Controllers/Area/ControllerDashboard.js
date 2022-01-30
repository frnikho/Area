import React from "react";
import DashboardPage from "../../Views/Area/DashboardPage.js"
import { AuthContext } from "../../Contexts/AuthContext";
import { withCookies } from "react-cookie";
import Controller from "../Controller"
import app from "../../Components/utils/Axios";

class ControllerDashboard extends Controller {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            services: undefined
        }
        this.cookies = props;
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() === undefined) {
            this.setRedirectUrl('/auth/login')
        } else {
            this.setState({
                user: this.authContext.getUser()
            })
        }

        this.loadServices();

    }

    loadServices() {
        app.get(`about.json`).then((response) => {
            this.setState({
                services: response.data.server.services
            })
        })
    }

    logout() {
        const { cookies } = this.props;
        cookies.remove('session', { path: '/' })
        this.authContext.setUser(undefined)
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
