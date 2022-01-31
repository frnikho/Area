import React from "react";
import DescriptionPage from "../Views/DescriptionPage"
import { withCookies } from "react-cookie";
import Controller from "./Controller"

class ControllerDashboard extends Controller {

    render() {
        return (
            <div>
                <DescriptionPage {...this} />
                {this.redirectUrl()}
            </div>
        );
    }

}

export default withCookies(ControllerDashboard);
