import React from 'react';
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

export default class App extends React.Component {
  render() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/"}>
                    <Route path={"auth"}>
                        <Route path={"login"} element={<LoginPage/>}/>
                        <Route path={"register"} element={<RegisterPage/>}/>
                    </Route>
                </Route>

            </Routes>
        </div>
    );
  }
}
