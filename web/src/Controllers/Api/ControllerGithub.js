import app from "../../Utils/Axios"

export default class ControllerGithub {

    static connect(data, callback) {
        app.get(`/auth/github/code?code=${data['code']}&type=web`).then((response) => {
            callback(response.data);
        }).catch((err) => {
            callback(undefined, err.response.data);
        });
    }
}
