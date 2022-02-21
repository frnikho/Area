import AxiosController from "./AxiosController";

export default class ServicesController {

    /**
     * Get about.json from server
     *
     * @param callback - true success / false error
     */
    public getAboutPointJSON(callback: (status: boolean, response: any) => void) {
        new AxiosController().get(new AxiosController().baseURL() + "/about.json", {}, (status, response) => {
            return callback(status, response);
        });
    }
}