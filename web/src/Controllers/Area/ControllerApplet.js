// import Controller from "../Controller"
import app, { config } from "../../Utils/Axios";

export default class ControllerApplet {

    constructor(authContext, cookies, page) {
        this.applet = page.props
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
        this.loadApplet = this.loadApplet.bind(this)
    }

    loadApplet() {
        app.get(`/applets/` + this.applet.uuid, config(this.authContext.getToken())).then((response) => {
            this.page.setState({
                applet: {...{...this.page.props}, ...{title: "lol", color: "red", description: "hello from the other side adzadad"}}
            })
            // console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }
}