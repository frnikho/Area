import Model from "../Model.js"
import app from "../../Components/utils/Axios"

export default class Google extends Model {
    constructor() {
        super();
        this.connect = this.connect.bind(this)
    }

    connect(data) {
        app.post(`/auth/Google/code`, {
            code: data['code']
        }).then((response) => {
            console.log(response)
            // if (response.data)
            //     setStatusLog(response.data);
            // if (response.data === "User logged") {
            //     // localStorage.setItem('user', JSON.stringify(response.data));
            //     Cookies.set('user', JSON.stringify(response.data));
            // }
        })
    }
}