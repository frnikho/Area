import TokenController from './TokenController';
import AxiosController from './AxiosController';
import ServicesController from './ServicesController';
import { UserApplets } from '../models/AppletsModels';
import app, { config } from '../axios_config';

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
        new AxiosController().get(
          baseURL + '/applets/all',
          new AxiosController().config(tokenResponse),
          (status, userAppletsResponse) => {
            if (status) {
              new ServicesController().getAboutPointJSON(
                (status, aboutResponse) => {
                  if (status) {
                    return callback(
                      status,
                      userAppletsResponse.data.data.map(obj => {
                        let info = this.getInfoByType(
                          aboutResponse.data,
                          obj.action_type,
                          obj.reactions[0].type,
                        );
                        return {
                          title: obj.title,
                          appletUuid: obj.uuid,
                          action: info.action,
                          reaction: info.reaction,
                          cardColor: info.color,
                          enable: obj.enable === 1 ? true : false,
                        } as UserApplets;
                      }),
                    );
                  } else {
                    return callback(status, aboutResponse);
                  }
                },
              );
            } else {
              return callback(status, userAppletsResponse);
            }
          },
        );
      } else {
        return callback(status, tokenResponse);
      }
    });
  }

  public createUserApplet(
    title: string,
    action: object,
    reaction: object,
    actionParam: any,
    reactionParam: any,
    callback: (status: boolean, response: any) => void,
  ) {
    const body = {
      title: title,
      action_key: actionParam,
      action_type: action.type,
      action: {
        parameters: action.parameters.map((param, i) => {
          return {
            name: param.name,
            value: actionParam[i],
          };
        }),
      },
      reactions: [
        {
          type: reaction.type,
          parameters: reaction.parameters.map((param, i) => {
            return {
              name: param.name,
              value: reactionParam[i],
            };
          }),
        },
      ],
    };
    new TokenController().getUserToken((status, tokenResponse) => {
      if (status) {
        app
          .post('/applets', body, config(tokenResponse))
          .then(response => {
            callback(true, response);
          })
          .catch(error => {
            callback(false, error);
          });
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
  private getInfoByType(
    aboutJSON: object,
    actionType: string,
    reactionType: string,
  ) {
    let action = undefined;
    let reaction = undefined;
    let color = undefined;
    aboutJSON.server.services.map(service => {
      let objAction = service.actions.filter(action => {
        if (action.type === actionType) return true;
      });
      if (objAction.length !== 0) action = objAction[0].if;
      let objReaction = service.reactions.filter(reaction => {
        if (reaction.type === reactionType) return true;
      });
      if (objReaction.length !== 0) reaction = objReaction[0].then;
      if (action !== undefined || reaction != undefined) color = service.color;
    });
    return { action: action, reaction: reaction, color: color };
  }

  /**
   * Delete an user applet
   * @param appletUuid
   * @param callback
   */
  public deleteUserApplet(appletUuid: string, callback: (status: boolean, response: any) => void) {
    new TokenController().getUserToken((status, tokenResponse) => {
      if (status) {
        let baseURL = new AxiosController().baseURL();
        new AxiosController().del(baseURL + "/applets/" + appletUuid, new AxiosController().config(tokenResponse), (status, appletDelResponse) => {
          return callback(status, appletDelResponse.data);
        });
      } else {
        return callback(status, tokenResponse);
      }
    });
  }

  /**
   * Enable Disable user's applet
   * @param appletUuid
   * @param callback
   */
  public toggleUserApplet(appletUuid: string, callback: (status: boolean, response: any) => void) {
    new TokenController().getUserToken((status, tokenResponse) => {
      if (status) {
        let baseURL = new AxiosController().baseURL();
        const body = new URLSearchParams();
        body.append('appletUuid', appletUuid);
        new AxiosController().post(baseURL + "/applets/toggle", body, new AxiosController().config(tokenResponse), (status, toggleAppletResponse) => {
          console.log(toggleAppletResponse)
          return callback(status, toggleAppletResponse.data);
        });
      } else {
        return callback(status, tokenResponse);
      }
    });
  }
}
