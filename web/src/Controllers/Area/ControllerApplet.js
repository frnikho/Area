// import Controller from "../Controller"
// import app, { config } from "../../Components/Utils/Axios";

export default class ControllerApplet {

    constructor(authContext, cookies, page) {
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
        // this.name = page.props.applet.name
        // this.color = props.color
        // this.description = page.props.description
        // this.icon = props.icon
    }
}