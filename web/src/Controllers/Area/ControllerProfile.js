// import Controller from "../Controller"
import ControllerDataBase from "../Api/ControllerDataBase"

export default class ControllerDashboard {

    constructor(authContext, cookies, page) {
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
        this.logout = this.logout.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
    }

    updateProfile(token, field, fieldName) {
        var fieldOpt = { value: field, name: undefined }

        if (fieldName === "First Name")
            fieldOpt.name = "firstname"
        if (fieldName === "Last Name")
            fieldOpt.name = "lastname"
        ControllerDataBase.updateProfile(token, fieldOpt, (data) => {
            if (data.success === true) {
                this.page.authContext.loginFromCache(token, () => {
                    this.page.forceUpdate()
                    this.page.setNotification({ message: fieldName + " change !", show: true, type: "success" });
                })
            } else {
                this.page.setNotification({ message: "Error with database", show: true, type: "error" });
            }
        }, (error) => {
            this.page.setNotification({ message: error.data.error, show: true, type: "error" });
        })
    }

    logout() {
        const { cookies } = this.cookies;
        cookies.remove('session', { path: '/', SameSite: 'none', secure: true })
        this.page.setRedirectUrl({ url: "/" })
        this.page.authContext.setUser(undefined)
    }
}
