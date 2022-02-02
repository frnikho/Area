import app from "../../Components/utils/Axios"
import React from "react";

export default class ControllerGithub extends React.Component{

    static connect(data) {
        app.post(`/auth/github/code`, {
            code: data['code']
        }).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err.response);
        });
    }
}