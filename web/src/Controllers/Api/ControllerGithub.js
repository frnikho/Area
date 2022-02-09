import app from "../../utils/Axios"

export default class ControllerGithub {

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