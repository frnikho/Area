import React from 'react';
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./Contexts/AuthContext";
import { withCookies } from "react-cookie";

//Controllers
import Home from "./Controllers/Home";
import LoginPage from "./Views/Auth/LoginPage";
import RegisterPage from "./Views/Auth/RegisterPage";
import DescriptionPage from "./Views/DescriptionPage"
import DashboardPage from "./Views/Area/DashboardPage"
import ProfilePage from "./Views/Area/ProfilePage"

class App extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }

    componentDiMount() {
        this.auth = this.context;
        const { cookies } = this.props;
        const token = cookies.get('session');
        this.auth.loginFromCache(token, (user) => {
            this.setAppRoutes();
        }, () => {
            this.setAppRoutes();
        })
    }

    setAppRoutes() {
        this.setState({
            data: (<Routes>
                <Route path='/' element={<Home />} />
                <Route path={"description"} element={<DescriptionPage />} />
                <Route path="auth">
                    <Route path={"login"} element={<LoginPage />} />
                    <Route path={"register"} element={<RegisterPage />} />
                </Route>
                <Route path="area">
                    <Route path={"dashboard"} element={<DashboardPage />} />
                    <Route path={"profile"} element={<ProfilePage />} />
                </Route>
            </Routes>)
        })
    }

    render() {
        if (!this.auth)
            this.componentDiMount()
        return (
            <div>
                {this.state.data !== undefined ? <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path={"description"} element={<DescriptionPage />} />
                    <Route path="auth">
                        <Route path={"login"} element={<LoginPage />} />
                        <Route path={"register"} element={<RegisterPage />} />
                    </Route>
                    <Route path="area">
                        <Route path={"dashboard"} element={<DashboardPage />} />
                        <Route path={"profile"} element={<ProfilePage />} />
                    </Route>
                </Routes> : null}
            </div>
        );
    }
}

export default withCookies(App);
