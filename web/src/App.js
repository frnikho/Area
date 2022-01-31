import React from 'react';
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./Contexts/AuthContext";
import { withCookies } from "react-cookie";

//Controllers
import Home from "./Controllers/Home";
import ControllerLogin from "./Controllers/Auth/ControllerLogin";
import ControllerRegister from "./Controllers/Auth/ControllerRegister";
import ControllerDescription from "./Controllers/ControllerDescription.js"
import ControllerDashboard from "./Controllers/Area/ControllerDashboard"
import ControllerProfile from "./Controllers/Area/ControllerProfile"

class App extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }

    componentWillMount() {
        const auth = this.context;
        const { cookies } = this.props;
        const token = cookies.get('session');
        auth.loginFromCache(token, (user) => {
            this.setAppRoutes();
        }, () => {
            this.setAppRoutes();
        })
    }

    setAppRoutes() {
        this.setState({
            data: (<Routes>
                <Route path='/' element={<Home />} />
                <Route path={"description"} element={<ControllerDescription />} />
                <Route path="auth">
                    <Route path={"login"} element={<ControllerLogin />} />
                    <Route path={"register"} element={<ControllerRegister />} />
                </Route>
                <Route path="area">
                    <Route path={"dashboard"} element={<ControllerDashboard />} />
                    <Route path={"profile"} element={<ControllerProfile />} />
                </Route>
            </Routes>)
        })
    }

    render() {
        return (
            <div>
                {this.state.data !== undefined ? <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path={"description"} element={<ControllerDescription />} />
                    <Route path="auth">
                        <Route path={"login"} element={<ControllerLogin />} />
                        <Route path={"register"} element={<ControllerRegister />} />
                    </Route>
                    <Route path="area">
                        <Route path={"dashboard"} element={<ControllerDashboard />} />
                        <Route path={"profile"} element={<ControllerProfile />} />
                    </Route>
                </Routes> : null}
            </div>
        );
    }
}

export default withCookies(App);
