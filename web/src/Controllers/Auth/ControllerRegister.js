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
            this.page.props.enqueueSnackbar("Error with google", { variant: 'error' });
        } else {
            ControllerGoogle.connect(response);
        }
    }

    githubLogin(response) {
        if (response.error) {
            this.page.props.enqueueSnackbar("Error with github", { variant: 'error' });
        } else {
            ControllerGithub.connect(response);
        }
    }

    registerDb(registerId) {
        ControllerDataBase.register(registerId, (response) => {
            if (response.data.success === true) {
                this.page.setRedirectUrl({url: '/auth/login'})
                this.page.props.enqueueSnackbar("Your register !", { variant: 'success' });
            } else {
                this.page.props.enqueueSnackbar("Error with the database", { variant: 'error' });
            }
        }, (err) => {
            this.page.props.enqueueSnackbar(err.data.error, { variant: 'error' });
        });
    }

}
