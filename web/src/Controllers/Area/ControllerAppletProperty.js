// import app, { config } from "../../Utils/Axios";

export default class ControllerAppletProperty {

    constructor(authContext, cookies, page, id) {
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
        this.id = id;
        this.token = this.authContext.getToken();
        this.loadApplet = this.loadApplet.bind(this)
        this.disableApplet = this.disableApplet.bind(this)
    }

    deleteApplet() {
        console.log("delete the applet with the id: " + this.id)
        // const appletId = this.id;

        // app.delete(`/applets/` + {appletId}, {
        // }, config(this.token)).then((response) => {
        //     console.log(response);
        // }).catch((error) => {
        //     console.log(error);
        // })
    }

    disableApplet() {
        console.log("disable the applet with the id: " + this.id)
        // app.post(`/applets/disable`, {
        //     appletUuid: this.id
        // }, config(this.token)).then((response) => {
        //     console.log(response);
        // }).catch((error) => {
        //     console.log(error);
        // })
    }

    enableApplet() {
        console.log("enable the applet with the id: " + this.id)
        // app.post(`/applets/enable`, {
        //     appletUuid: this.id
        // }, config(this.token)).then((response) => {
        //     console.log(response);
        // }).catch((error) => {
        //     console.log(error);
        // })
    }

    loadApplet() {
        // app.get(`about.json`).then((response) => {
        //     this.page.setState({services: response.data.server.services})
        // })
        console.log("get the applet with the id: " + this.id)
    }
}
