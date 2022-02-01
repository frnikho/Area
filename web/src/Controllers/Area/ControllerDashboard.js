import React from "react";
import DashboardPage from "../../Views/Area/DashboardPage.js"
import { AuthContext } from "../../Contexts/AuthContext";
import { withCookies } from "react-cookie";
import Controller from "../Controller"
import app, { config } from "../../Components/utils/Axios";

class ControllerDashboard extends Controller {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            services: undefined
        }
        this.cookies = props;
    }

    componentWillMount() {
        this.authContext = this.context;
        if (this.authContext.getUser() === undefined) {
            this.setRedirectUrl('/auth/login')
        } else {
            this.setState({
                user: this.authContext.getUser()
            })
        }

        this.loadServices();
        this.loadApplets()

    }

    loadServices() {
        app.get(`about.json`).then((response) => {
            this.setState({
                services: response.data.server.services
            })
        })
    }

    loadApplets() {
        console.log("wait applets")
        // app.get(`/applets/all`, config(this.authContext.getToken(), this.auth
        // )).then((response) => {
        //     if (response.data.succes)
        //         this.setState({ services: response.data.server.services })
        // }).catch((error) => {
        //     console.log(error)
        // })
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
