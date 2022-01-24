import Model from "../Model.js"
import app from "../../Components/utils/Axios"

export default class Github extends Model {
    constructor() {
        super();

        this.Connect = this.Connect.bind(this);
    }

    Connect(data) {
        app.post(`/auth/github/code`, {
            code: data['code']
        }).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err.response);
        });
    }
}