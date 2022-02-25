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
            this.page.props.enqueueSnackbar("Error with Google", { variant: 'error' });
        } else {
            ControllerGoogle.connect(response, (data, error) => {
                if (error)
                    return this.page.props.enqueueSnackbar(error['error'], { variant: 'error' });
                this.authContext.loginFromCache((data.token), () => {
                    const { cookies } = this.cookies;
                    cookies.set('session', data.token, { path: '/', SameSite: 'None', secure: true });
                    this.page.setRedirectUrl({ url: '/' })
                    this.page.props.enqueueSnackbar("You're logged !", { variant: 'success', })
                })
            });
        }
    }

    githubLogin(response) {
        console.log(response);
        if (response.error) {
            this.page.props.enqueueSnackbar("Error with GitHub", { variant: 'error' });
        } else {
            ControllerGithub.connect(response, (data, error) => {
                if (error)
                    return this.page.props.enqueueSnackbar(error['error'], { variant: 'error' });
                this.authContext.loginFromCache((data.token), () => {
                    const { cookies } = this.cookies;
                    cookies.set('session', data.token, { path: '/', SameSite: 'None', secure: true });
                    this.page.setRedirectUrl({ url: '/' })
                    this.page.props.enqueueSnackbar("You're logged !", { variant: 'success', })
                })
            });
        }
    }

    loginDb(loginId, callback) {
        ControllerDataBase.connect(loginId, (data) => {
            if (data.success === true) {
                this.authContext.loginFromCache((data.token), () => {
                    const { cookies } = this.cookies;
                    cookies.set('session', data.token, { path: '/', SameSite: 'None', secure: true });
                    this.page.setRedirectUrl({ url: '/' })
                    this.page.props.enqueueSnackbar("You're logged !", { variant: 'success', })
                })
            } else {
                this.page.props.enqueueSnackbar("An error occurred ! please try again later", { variant: 'error' });
            }
        }, (error) => {
            this.page.props.enqueueSnackbar(error.data && error.data.error, { variant: 'error' });
        })
    }

}
