import app, { config } from "../../Utils/Axios";

export default class ControllerAppletProperty {

    constructor(authContext, cookies, page, id) {
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
        this.id = id;
        this.loadApplet = this.loadApplet.bind(this)
        this.disableApplet = this.disableApplet.bind(this)
    }

    deleteApplet() {
        const appletId = this.id;

        app.delete(`/applets/` + {appletId}, {
        }, config(token)).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    disableApplet() {
        app.post(`/applets/disable`, {
            appletUuid: this.id
        }, config(token)).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    enableApplet() {
        app.post(`/applets/enable`, {
            appletUuid: this.id
        }, config(token)).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    loadApplet() {
        // app.get(`about.json`).then((response) => {
        //     this.page.setState({services: response.data.server.services})
        // })
        console.log("get the applet with the id: " + this.id)
    }
}
