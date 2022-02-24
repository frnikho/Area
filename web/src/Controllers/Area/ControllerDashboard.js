// import Controller from "../Controller"
import app, { config } from "../../Utils/Axios";

export default class ControllerDashboard {

    constructor(authContext, cookies, page) {
        this.authContext = authContext
        this.cookies = cookies;
        this.page = page;
        this.loadApplets = this.loadApplets.bind(this)
        this.loadServices = this.loadServices.bind(this)
        this.completeApplets = this.completeApplets.bind(this)
        this.getDataFromService = this.getDataFromService.bind(this)
        this.getActionFromServiceData = this.getActionFromServiceData.bind(this)
        this.getReactionFromServiceData = this.getReactionFromServiceData.bind(this)
    }

    getActionFromServiceData(actionType) {
        for (let itService in this.page.state.services) {
            for (let itAction in this.page.state.services[itService].actions) {
                if (this.page.state.services[itService].actions[itAction].type === actionType) {
                    return {
                        color: this.page.state.services[itService].color,
                        ifIcon: this.page.state.services[itService].icon,
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
                        description: "then " + this.page.state.services[itService].reactions[itReaction].then,
                        thenIcon: this.page.state.services[itService].icon,
                    }
                }
            }
        }
    }

    getDataFromService(actionType, reactionType) {
        var action = this.getActionFromServiceData(actionType)
        var reaction = this.getReactionFromServiceData(reactionType)
        return { ...action, ...reaction, ...{ description: action.description + " " + reaction.description } }
    }

    completeApplets(data) {
        var applets = []
        for (let it in data) {
            let serviceData = this.getDataFromService(data[it].action_type, data[it].reactions[0].type)
            applets.push({ ...{ ...data[it], ...serviceData, title: (data[it].title !== "" ? data[it].title : "<applet title>") }, description: serviceData.description })
        }
        this.page.setState({ applets: applets })
    }

    loadServices() {
        app.get(`about.json`).then((response) => {
            this.page.setState({ services: response.data.server.services })
            console.log(response.data.server)
        })
    }

    loadApplets() {
        app.get(`/applets/all`, config(this.authContext.getToken(),
        )).then((response) => {
            if (response.data.success) {
                this.completeApplets(response.data.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }
}
