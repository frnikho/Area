import ControllerDataBase from "../Api/ControllerDataBase"
import ControllerGithub from "../Api/ControllerGithub.js"
import ControllerGoogle from "../Api/ControllerGoogle.js"

export default class ControllerRegister {

    constructor(authContext, cookies, page) {
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
        this.registerDb = this.registerDb.bind(this)
        this.googleLogin = this.googleLogin.bind(this);
        this.githubLogin = this.githubLogin.bind(this);
    }

    googleLogin(response) {
        if (response.error) {
            this.page.setNotification({ message: "Error with google", show: true, type: "error" });
        } else {
            ControllerGoogle.connect(response);
        }
    }

    githubLogin(response) {
        if (response.error) {
            this.page.setNotification({ message: "Error with google", show: true, type: "error" });
        } else {
            ControllerGithub.connect(response);
        }
    }

    registerDb(registerId) {
        ControllerDataBase.register(registerId, (response) => {
            if (response.data.success === true) {
                this.page.setRedirectUrl('/auth/login')
                this.page.setNotification({ message: "Register", show: true, type: "succes" });
            } else {
                this.setNotification({ message: "error with the ControllerDataBase", show: true, type: "error" });
            }
        }, (err) => {
            this.page.setNotification({ message: err.data.error, show: true, type: "error" });
        });
    }

}
