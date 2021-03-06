import app, { config } from "../../Utils/Axios";

export default class ControllerDataBase {

    static connect(loginId, onSucess, onError) {
        app.post(`/auth/login`, {
            email: loginId.email,
            password: loginId.password,
        }).then((response) => {
            onSucess(response.data)
        }).catch((err) => {
            if (err.response === undefined)
                onError(err);
            else
                onError(err.response);
        })
    }


    static register(registerId, onSuccess, onError) {
        app.post(`/auth/register`, {
            firstname: registerId.firstName,
            lastname: registerId.lastName,
            email: registerId.email,
            password: registerId.password,
        }).then((response) => {
            onSuccess(response);
        }).catch((err) => {
            console.log(err)
            if (err.response === undefined)
                onError(err);
            else
                onError(err.response);
        })
    }

    static updateProfile(token, field, onSuccess, onError) {
        if (field.name === "firstname") {
            app.patch(`/me`, {
                firstname: field.value
            }, config(token)).then((response) => {
                onSuccess(response.data);
            }).catch((err) => {
                console.log(err)
                if (err.response === undefined)
                    onError(err);
                else
                    onError(err.response);
            })
        }
        if (field.name === "lastname") {
            app.patch(`/me`, {
                lastname: field.value
            }, config(token)).then((response) => {
                onSuccess(response.data);
            }).catch((err) => {
                console.log(err)
                if (err.response === undefined)
                    onError(err);
                else
                    onError(err.response);
            })
        }
    }
}