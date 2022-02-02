import app from "../../Components/utils/Axios"
import React from "react";

export default class ControllerDataBase extends React.Component {

    static connect(email, password, onSucess, onError) {
        app.post(`/auth/login`, {
            email: email,
            password: password,
        }).then((response) => {
            onSucess(response.data)
        }).catch((err) => {
            if (err.response === undefined)
                onError(err);
            else
                onError(err.response);
        })
    }


    static register({ email, firstname, lastname, password }, onSuccess, onError) {
        app.post(`/auth/register`, {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        }).then((response) => {
            onSuccess(response);
        }).catch((err) => {
            if (err.response === undefined)
                onError(err);
            else
                onError(err.response);
        })
    }
}