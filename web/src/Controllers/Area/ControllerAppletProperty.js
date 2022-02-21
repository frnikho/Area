import app, { config } from "../../Utils/Axios";

export default class ControllerAppletProperty {

    constructor(authContext, cookies, page) {
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
        this.id = page.props.params.id.substring(1) || null;
        this.token = this.authContext.getToken();
        this.loadApplet = this.loadApplet.bind(this)
        this.disableApplet = this.disableApplet.bind(this)
    }

    deleteApplet() {
        console.log("delete the applet with the id: " + this.id)
        const appletId = this.id;

        app.delete(`/applets/` + appletId, config(this.token)).then((response) => {
            console.log(response);
            this.page.setRedirectUrl({ url: "/area/dashboard" })
        }).catch((error) => {
            console.log(error);
        })
    }

    disableApplet() {
        console.log("disable the applet with the id: " + this.id)
        app.post(`/applets/disable`, {
            appletId: this.id
        }, config(this.token)).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    enableApplet() {
        console.log("enable the applet with the id: " + this.id)
        app.post(`/applets/enable`, {
            appletId: this.id
        }, config(this.token)).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    loadApplet() {
        console.log("get the applet with the id: " + this.id)
        console.log(this.id)
        app.get(`/applets/` + this.id, config(this.token)).then((response) => {
            if (response.statusText === "OK") {
                this.page.setState({
                    applet: { ...{ ...response.data[0] }, ...{ title: "Github", color: "red", description: "hello from the other side adzadad" } }
                })
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}
