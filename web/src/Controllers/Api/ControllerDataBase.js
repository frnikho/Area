import app from "../../Components/utils/Axios"

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
}