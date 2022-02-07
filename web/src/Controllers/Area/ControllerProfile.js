// import Controller from "../Controller"
// import app, { config } from "../../Components/utils/Axios";

export default class ControllerDashboard {

    constructor(authContext, cookies, page) {
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
        this.logout = this.logout.bind(this)
    }

    logout() {
        const { cookies } = this.cookies;
        cookies.remove('session', { path: '/', SameSite: 'none', secure: true })
        this.page.authContext.setUser(undefined)
        this.page.setRedirectUrl("/")
    }
}
