import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from "./Controllers/Auth/Login";
import Register from "./Controllers/Auth/Register";
import Home from "./Controllers/Home";
import {AuthContext} from "./Contexts/AuthContext";
import {withCookies} from "react-cookie";

class App extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }

    componentDidMount() {
        const auth = this.context;
        const {cookies} = this.props;
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
                <Route path='/' element={<Home/>} />
                <Route path="auth">
                    <Route path={"login"} element={<Login />} />
                    <Route path={"register"} element={<Register />} />
                </Route>
            </Routes>)
        })
    }

    render() {
        return (
            <div>
                {this.state.data !== undefined ? <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path="auth">
                        <Route path={"login"} element={<Login />} />
                        <Route path={"register"} element={<Register />} />
                    </Route>
                </Routes> : null}
            </div>
        );
    }
}

export default withCookies(App);
