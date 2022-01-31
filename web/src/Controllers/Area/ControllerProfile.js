import React from "react";
import ProfilePage from "../../Views/Area/ProfilePage.js"
import { AuthContext } from "../../Contexts/AuthContext";
import { withCookies } from "react-cookie";
import Controller from "../Controller"

class ControllerProfile extends Controller {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
        }
        this.cookies = props;
        this.logout = this.logout.bind(this)
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
    }

    logout() {
        const { cookies } = this.props;
        cookies.remove('session', { path: '/' })
        this.authContext.setUser(undefined)
        this.setRedirectUrl("/")
    }

    render() {
        return (this.controllerRender(this, ProfilePage))

    }

}

export default withCookies(ControllerProfile);
