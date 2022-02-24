import AxiosController from './AxiosController';
import TokenController from './TokenController';
import app, { config } from '../axios_config';

export default class ServicesAuthentificationsController {
  /**
   * Check if user have services authentifications
   *
   * @param servicesAuth
   * @param callback
   * @returns
   */
  public userHaveServicesAuth(
    servicesAuth: object,
    callback: (status: boolean) => void,
  ) {
    let len = servicesAuth.length;
    let i = 0;
    servicesAuth.map(service => {
      if (service.count === 0) i++;
    });
    return callback(i === len ? true : false);
  }

  /**
   * Get all user's services authentifications
   *
   * @param callback
   */
  public getAllUserServicesAuthentifications(
    callback: (status: boolean, response: any) => void,
  ) {
    new TokenController().getUserToken((status, tokenResponse) => {
      if (status) {
        let baseURL = new AxiosController().baseURL();
        new AxiosController().get(
          baseURL + '/context/all',
          new AxiosController().config(tokenResponse),
          (status, contextAllResponse) => {
            return callback(status, contextAllResponse.data);
          },
        );
      } else {
        return callback(status, tokenResponse);
      }
    });
  }

  /**
   * Delete service auth
   *
   * @param serviceName
   * @param serviceAuthUuid
   * @param callback
   */
  public deleteServiceAuthentification(
    serviceName: string,
    serviceAuthUuid: string,
    callback: (status: boolean, response: any) => void,
  ) {
    new TokenController().getUserToken((status, tokenResponse) => {
      if (status) {
        let baseURL = new AxiosController().baseURL();
        new AxiosController().del(
          baseURL +
          '/context?key=' +
          serviceAuthUuid +
          '&service=' +
          serviceName,
          new AxiosController().config(tokenResponse),
          (status, contextDelResponse) => {
            return callback(status, contextDelResponse.data);
          },
        );
      } else {
        return callback(status, tokenResponse);
      }
    });
  }

  /**
   * @description Create new service authentification token
   *
   * @param title
   * @param description
   * @param token_data
   * @param serviceName
   * @param callback
   */
  public createServiceAuthentification(
    title: string,
    description: string,
    token_data: object,
    serviceName: string,
    callback: (status: boolean, response: any) => void,
  ) {
    const body = {
      title: title,
      description: description,
      service: serviceName,
      token_data: token_data,
    };
    new TokenController().getUserToken((status, res) => {
      if (status === true) {
        app
          .post(`context`, body, config(res))
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
   * Get services auth by service name
   * @param serviceName
   * @param callback
   */
  public getServicesAuthByService(serviceName: string, callback: (status: boolean, response: any) => void) {
    new ServicesAuthentificationsController().getAllUserServicesAuthentifications((status, response) => {
      if (status) {
        let obj = response.filter(service => {
          if (service.service === serviceName) return true;
        });
        return callback(status, obj[0])
      } else {
        return callback(status, response);
      }
    },
    );
  }
}
