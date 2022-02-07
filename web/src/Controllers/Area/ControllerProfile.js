// import Controller from "../Controller"
// import app, { config } from "../../Components/utils/Axios";
import ControllerDataBase from "../Api/ControllerDataBase"

export default class ControllerDashboard {

    constructor(authContext, cookies, page) {
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
        this.logout = this.logout.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
    }

    updateProfile(field, fieldName) {
        var fieldOpt = { value: field, name: undefined }

        if (fieldName === "First Name")
            fieldOpt.name = "firstname"
        if (fieldName === "Last Name")
            fieldOpt.name = "lastname"
        ControllerDataBase.updateProfile(fieldOpt, (data) => {
            if (data.success === true) {
                console.log(data)
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
        this.page.authContext.setUser(undefined)
        this.page.setRedirectUrl("/")
    }
}
