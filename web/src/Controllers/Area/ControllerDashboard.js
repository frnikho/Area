// import Controller from "../Controller"
import app, { config } from "../../Utils/Axios";

export default class ControllerDashboard {

    constructor(authContext, cookies, page) {
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
        this.loadApplets = this.loadApplets.bind(this)
        this.loadServices = this.loadServices.bind(this)
    }

    loadServices() {
        app.get(`about.json`).then((response) => {
            this.page.setState({services: response.data.server.services})
        })
    }

    loadApplets() {
        config()
        console.log("wait applets")
        // app.get(`/applets/all`, config(this.authContext.getToken(), this.auth
        // )).then((response) => {
        //     if (response.data.succes)
        //         this.setState({ services: response.data.server.services })
        // }).catch((error) => {
        //     console.log(error)
        // })
    }
}
