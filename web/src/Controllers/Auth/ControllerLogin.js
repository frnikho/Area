import ControllerDataBase from "../Api/ControllerDataBase"
import ControllerGithub from "../Api/ControllerGithub.js"
import ControllerGoogle from "../Api/ControllerGoogle.js"

export default class ControllerLogin {

    constructor(authContext, cookies, page) {
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
        this.loginDb = this.loginDb.bind(this)
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

    loginDb(loginId) {
        ControllerDataBase.connect(loginId, (data) => {
            if (data.success === true) {
                this.authContext.loginFromCache((data.token), () => {
                    const { cookies } = this.cookies;

                    cookies.set('session', data.token, { path: '/', SameSite: 'None', secure: true });
                    this.page.setRedirectUrl('/')
                })
            } else {
                this.page.setNotification({ message: "Error with ControllerDataBase", show: true, type: "error" });
            }
        }, (error) => {
            this.page.setNotification({ message: error.data.error, show: true, type: "error" });
        })

    }

}
