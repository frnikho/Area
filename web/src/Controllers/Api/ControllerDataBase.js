import app from "../../Components/utils/Axios"
import { LoginModel } from "../../Models/ModelAuth"

export default class ControllerDataBase {

    static connect(LoginModel, onSucess, onError) {
        app.post(`/auth/login`, {
            email: LoginModel.email,
            password: LoginModel.password,
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