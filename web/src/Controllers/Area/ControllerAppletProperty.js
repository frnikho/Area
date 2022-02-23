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
        this.completeApplets = this.completeApplets.bind(this)
        this.getDataFromService = this.getDataFromService.bind(this)
        this.getActionFromServiceData = this.getActionFromServiceData.bind(this)
        this.getReactionFromServiceData = this.getReactionFromServiceData.bind(this)
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
            appletUuid: this.id
        }, config(this.token)).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    enableApplet() {
        console.log("enable the applet with the id: " + this.id)
        app.post(`/applets/enable`, {
            appletUuid: this.id
        }, config(this.token)).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    getActionFromServiceData(actionType) {
        for (let itService in this.page.state.services) {
            for (let itAction in this.page.state.services[itService].actions) {
                if (this.page.state.services[itService].actions[itAction].type === actionType) {
                    return {
                        author: this.page.state.services[itService].name,
                        color: this.page.state.services[itService].color,
                        icon: this.page.state.services[itService].icon,
                        description: "if " + this.page.state.services[itService].actions[itAction].if
                    }
                }
            }
        }
    }

    getReactionFromServiceData(reactionType) {
        for (let itService in this.page.state.services) {
            for (let itReaction in this.page.state.services[itService].reactions) {
                if (this.page.state.services[itService].reactions[itReaction].type === reactionType) {
                    return {
                        description: "then " + this.page.state.services[itService].reactions[itReaction].then
                    }
                }
            }
        }
    }

    getDataFromService(actionType, reactionType) {
        var action = this.getActionFromServiceData(actionType)
        var reaction = this.getReactionFromServiceData(reactionType)
        return { ...action, ...{ description: action.description + " " + reaction.description } }
    }

    completeApplets(data) {
        let serviceData = this.getDataFromService(data.action_type, data.reactions[0].type)
        this.page.setState({ applet: { ...{ ...data, ...serviceData, title: (data.title !== "" ? data.title : "<applet title>") }, description: serviceData.description } })
    }

    loadServices() {
        app.get(`about.json`).then((response) => {
            this.page.setState({ services: response.data.server.services })
        })
    }

    loadApplet() {
        app.get(`/applets/` + this.id, config(this.token)).then((response) => {
            if (response.statusText === "OK") {
                this.completeApplets(response.data)
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}
