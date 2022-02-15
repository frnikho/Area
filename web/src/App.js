import React from 'react';
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./Contexts/AuthContext";
import { withCookies } from "react-cookie";

//Controllers
import HomePage from "./Views/HomePage";
import LoginPage from "./Views/Auth/LoginPage";
import RegisterPage from "./Views/Auth/RegisterPage";
import DescriptionPage from "./Views/DescriptionPage"
import DashboardPage from "./Views/Area/DashboardPage"
import ProfilePage from "./Views/Area/ProfilePage"
import AppletPage from "./Views/Area/AppletPage";
import AppletPropertyPage from "./Views/Area/AppletPropertyPage";
import ContextPage from "./Views/Area/ContextPage";

class App extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
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
            loading: false
        })
    }

    render() {
        if (!this.auth)
            this.componentDidMount()
        return (
            <div>
                {this.state.loading !== true ? <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path={"description"} element={<DescriptionPage />} />
                    <Route path="auth">
                        <Route path={"login"} element={<LoginPage />} />
                        <Route path={"register"} element={<RegisterPage />} />
                    </Route>
                    <Route path="area">
                        <Route path="applets">
                            <Route path="add" element={<AppletPage />} />
                            <Route path="property/:id" element={<AppletPropertyPage />} />
                        </Route>
                        <Route path={"context"} element={<ContextPage/>}/>
                        <Route path={"dashboard"} element={<DashboardPage />} />
                        <Route path={"services"} element={console.log("services")} />
                        <Route path={"profile"} element={<ProfilePage />} />
                    </Route>
                </Routes> : null}
            </div>
        );
    }
}

export default withCookies(App);
