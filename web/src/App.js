import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Controllers/Auth/Login";
import RegisterPage from "./Views/Auth/RegisterPage";

export default class App extends React.Component {

    render() {
        return (
            <Routes>
                <Route path={"/"}>
                    <Route path='' element={<Navigate to ="/auth/login" />} />
                    <Route path={"auth"}>
                        <Route path={"login"} element={<Login />} />
                        <Route path={"register"} element={<RegisterPage />} />
                    </Route>
                </Route>
            </Routes>
        );
    }
}
