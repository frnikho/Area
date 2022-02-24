// import React from "react";
import ControllerHome from "../Controllers/ControllerHome"
import Page from "./Page"
import { AuthContext } from "../Contexts/AuthContext";

export default class HomePage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.cookies = props;
        this.state = {
            user: undefined,
        }
    }

    componentDidMount() {
        this.auth = this.context;
        if (this.auth.getUser() === undefined) {
            this.setRedirectUrl({ url: '/auth/login' })
        } else {
            this.setState({ user: this.auth.getUser() })
            this.setRedirectUrl({ url: '/area/dashboard' })
        }
        this.controllerHome = new ControllerHome(this.cookies, this);
    }

    render() {
        if (this.getUrl())
            return (this.redirectUrl())
        if (this.state.user === undefined)
            return (null);
        return (
            <div>
                <h2>Welcome {this.state.user.email}</h2>
            </div>
        )
    }
}
