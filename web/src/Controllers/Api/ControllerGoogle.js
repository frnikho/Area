import app from "../../Utils/Axios"

export default class ControllerGoogle {

    static connect(data, callback) {
        app.get(`/auth/google/code?code=${data['code']}&type=web`).then((response) => {
            callback(response.data);
        }).catch((error) => {
            callback(undefined, error.response.data);
        })
    }
}
