import app from "../../Utils/Axios"

export default class ControllerGithub {

    static connect(data) {
        app.get(`/auth/github/code?code=${data['code']}&type=web`).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err.response);
        });
    }
}
