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
                                        let info = this.getInfoByType(aboutResponse.data, obj.action_type, obj.reactions[0].type);
                                        return {
                                            action: info.action,
                                            reaction: info.reaction,
                                            cardColor: info.color
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
     * Get info in about.json according to type
     *
     * @param aboutJSON
     * @param actionType
     * @param reactionType
     * @returns
     */
    private getInfoByType(aboutJSON: object, actionType: string, reactionType: string) {
        let action = undefined;
        let reaction = undefined;
        let color = undefined;
        aboutJSON.server.services.map((service) => {
            let objAction = service.actions.filter((action) => {
                if (action.type === actionType)
                    return true
            })
            if (objAction.length !== 0)
                action = objAction[0].if;
            let objReaction = service.reactions.filter((reaction) => {
                if (reaction.type === reactionType)
                    return true
            })
            if (objReaction.length !== 0)
                reaction = objReaction[0].then;
            if (action !== undefined || reaction != undefined)
                color = service.color
        });
        return ({ action: action, reaction: reaction, color: color });
    }
}