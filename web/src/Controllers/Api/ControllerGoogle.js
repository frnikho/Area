import app from "../../Utils/Axios"

export default class ControllerGoogle {

    static connect(data) {
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