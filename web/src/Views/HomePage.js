import React from "react";

import {Navigate} from "react-router-dom";

export default function HomePage(props) {

    const showWelcomeUser = () => {
        if (props.state.user === undefined)
            return;
        return (
            <div>
                <h2>Welcome {props.state.user.email}</h2>
            </div>
        )

    }

    return (
        <div>
            {props.state.redirectUrl !== undefined ? <Navigate to={props.state.redirectUrl}/> : null}
            {showWelcomeUser()}
        </div>
    );
}

