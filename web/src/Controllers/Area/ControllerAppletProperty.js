// import Controller from "../Controller"
// import app, { config } from "../../Utils/Axios";

export default class ControllerAppletProperty {

    constructor(authContext, cookies, page) {
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
        this.loadApplet = this.loadApplet.bind(this)
    }

    loadApplet(id) {
        // app.get(`about.json`).then((response) => {
        //     this.page.setState({services: response.data.server.services})
        // })
        console.log("get the applet with the id: " + id)
    }
}
