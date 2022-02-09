import app from '../axios_config';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URL,
  GITHUB_CLIENT_ID,
  GITHUB_REDIRECT_URL,
  GITHUB_CLIENT_SECRET,
} from '@env';
import {authorize} from 'react-native-app-auth';

export default class LoginController {
  public nativeLogin(
    email: string | undefined,
    password: string | undefined,
    callback: (status: boolean, response: any) => void,
  ): void {
    if (email === undefined || password === undefined) {
      callback(false, 'Email or password are required');
    }
    app
      .post(`/auth/login`, {
        email: email,
        password: password,
      })
      .then(async (response: any) => {
        if (response.status === 200) {
          callback(true, response);
        }
      })
      .catch((err: any) => {
        callback(false, err);
      });
  }

  public googleLogin(callback: (status: boolean, response: any) => void): void {
    const config = {
      issuer: 'https://accounts.google.com',
      clientId: GOOGLE_CLIENT_ID,
      redirectUrl: GOOGLE_REDIRECT_URL,
      responseType: 'code',
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      dangerouslyAllowInsecureHttpRequests: true,
      skipCodeExchange: true,
    };

    authorize(config)
      .then(result => {
        app
          .get(`/auth/google/code?code=${result.authorizationCode}`)
          .then(response => {
            callback(true, response);
          })
          .catch(err => {
            callback(false, err);
          });
      })
      .catch(err => {
        callback(false, err);
      });
  }

  public githubLogin(callback: (status: boolean, response: any) => void): void {
    const config = {
      redirectUrl: GITHUB_REDIRECT_URL,
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      scopes: ['identity'],
      additionalHeaders: {Accept: 'application/json'},
      serviceConfiguration: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint:
          'https://github.com/settings/connections/applications/<client-id>',
      },
    };
    authorize(config)
      .then(result => {
        app
          .get(`/auth/github/code?code=${result.authorizationCode}`)
          .then(response => {
            callback(true, response);
          })
          .catch(err => {
            callback(false, err);
          });
      })
      .catch(err => {
        callback(false, err);
      });
  }
}
