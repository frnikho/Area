import TokenController from './TokenController';
import AxiosController from "./AxiosController";
import ServicesController from './ServicesController';
import { UserApplets } from '../models/AppletsModels';

export default class AppletsController {

    /**
     * Get user's applets
     *
     * @param callback
     */
    public getUsersApplets(callback: (status: boolean, response: any) => void) {
        new TokenController().getUserToken((status, tokenResponse) => {
            if (status) {
                let baseURL = new AxiosController().baseURL();
                new AxiosController().get(baseURL + "/applets/all", new AxiosController().config(tokenResponse), (status, userAppletsResponse) => {
                    if (status) {
                        new ServicesController().getAboutPointJSON((status, aboutResponse) => {
                            if (status) {
                                return callback(true,
                                    userAppletsResponse.data.data.map((obj) => {
                                        return {
                                            action: this.convertActionTypeToAction(aboutResponse.data, obj.action_type),
                                            reaction: this.convertReactionTypeToReaction(aboutResponse.data, obj.reactions[0].type)
                                        } as UserApplets
                                    })
                                );
                            } else {
                                return callback(status, aboutResponse);
                            }
                        });
                    } else {
                        return callback(status, userAppletsResponse);
                    }
                });
            } else {
                return callback(status, tokenResponse);
            }
        });
    }

    /**
     * Convert action type according to action in about.json
     *
     * @param aboutJSON
     * @param type
     * @returns
     */
    private convertActionTypeToAction(aboutJSON: object, type: string) {
        let action = undefined;
        aboutJSON.server.services.map((service) => {
            let obj = service.actions.filter((action) => {
                if (action.type === type)
                    return true
            })
            if (obj.length !== 0)
                action = obj[0].if;
        });
        return action;
    }

    /**
     * Convert reaction type according to reaction in about.json
     *
     * @param aboutJSON
     * @param type
     * @returns
     */
    private convertReactionTypeToReaction(aboutJSON: object, type: string) {
        let reaction = undefined;
        aboutJSON.server.services.map((service) => {
            let obj = service.reactions.filter((reaction) => {
                if (reaction.type === type)
                    return true
            })
            if (obj.length !== 0)
                reaction = obj[0].then;
        });

        return reaction;
    }
}