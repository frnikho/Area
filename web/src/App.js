import React from 'react';
import { Route, Routes } from "react-router-dom";
import ControllerLogin from "./Controllers/Auth/ControllerLogin";
import ControllerRegister from "./Controllers/Auth/ControllerRegister";
import ControllerDescription from "./Controllers/ControllerDescription.js"
import ControllerDashboard from "./Controllers/Area/ControllerDashboard"
import Home from "./Controllers/Home";
import { AuthContext } from "./Contexts/AuthContext";
import { withCookies } from "react-cookie";
import AppletPage from "./Views/Area/AppletPage";

class App extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        const auth = this.context;
        const { cookies } = this.props;
        const token = cookies.get('session');
        auth.loginFromCache(token, (user) => {
            this.setState({
                loading: false,
            })
        }, () => {
            this.setState({
                loading: false,
            })
        })
    }

    render() {
        return (
            <div className={"App"}>
                {this.state.loading === false ? <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path={"description"} element={<ControllerDescription />} />
                    <Route path="applets" element={<AppletPage/>}/>
                    <Route path="auth">
                        <Route path={"login"} element={<ControllerLogin />} />
                        <Route path={"register"} element={<ControllerRegister />} />
                    </Route>
                    <Route path="area">
                        <Route path={"dashboard"} element={<ControllerDashboard />} />
                    </Route>
                </Routes> : null}
            </div>
        );
    }
}

export default withCookies(App);
