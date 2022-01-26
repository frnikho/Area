import Model from "../Model.js"
import app from "../../Components/utils/Axios"

export default class Google extends Model {
    constructor() {
        super();
        this.Connect = this.Connect.bind(this)
    }

    Connect(data) {
        app.post(`/auth/Google/code`, {
            code: data['code']
        }).then((response) => {
            // if (response.data)
            //     setStatusLog(response.data);
            // if (response.data === "User logged") {
            //     // localStorage.setItem('user', JSON.stringify(response.data));
            //     Cookies.set('user', JSON.stringify(response.data));
            // }
        })
    }
}