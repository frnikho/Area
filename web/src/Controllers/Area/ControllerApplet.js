// import Controller from "../Controller"
// import app, { config } from "../../Utils/Axios";

export default class ControllerApplet {

    constructor(authContext, cookies, page) {
        this.applet = page.props
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
    }
}