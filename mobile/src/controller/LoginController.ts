import app, {config} from '../axios_config';
import {authorize} from 'react-native-app-auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import TokenController from './TokenController';
// const pkceChallenge = require("pkce-challenge");
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

  public async googleLogin(callback: (status: boolean, response: any) => void) {
    GoogleSignin.configure({
      scopes: ['profile'],
      webClientId: process.env.GOOGLE_CLIENT_ID,
    });

    GoogleSignin.hasPlayServices()
      .then(() => {
        GoogleSignin.signIn()
          .then(res => {
            callback(true, res);
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
      redirectUrl: process.env.GITHUB_REDIRECT_URL,
      clientId: process.env.GITHUB_CLIENT_ID,
      scopes: ['identity'],
      additionalHeaders: {Accept: 'application/json'},
      skipCodeExchange: true,
      responseType: 'code',
      serviceConfiguration: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.GITHUB_CLIENT_ID}`,
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

  public spotifyLogin(
    callback: (status: boolean, response: any) => void,
  ): void {}

  public twitterLogin(callback: (status: boolean, response: any) => void) {
    // const pkce = pkceChallenge();
  }

  public discordLogin(
    callback: (status: boolean, response: any) => void,
  ): void {
    const conf = {
      clientId: process.env.DISCORD_SERVICES_CLIENT_ID,
      // clientSecret: 'YOUR_CLIENT_SECRET',
      redirectUrl: 'com.area://callback',
      scopes: [
        'email',
        'identify',
        'guilds',
        'connections',
        'bot',
        'messages.read',
      ],
      // usePKCE: false,
      skipCodeExchange: true,
      responseType: 'code',
      serviceConfiguration: {
        authorizationEndpoint: 'https://discordapp.com/api/oauth2/authorize',
        tokenEndpoint: 'https://discordapp.com/api/oauth2/token',
        revocationEndpoint: 'https://discordapp.com/api/oauth2/token/revoke',
      },
      useNonce: false,
      // usePKCE: false,
      additionalParameters: {
        permissions: '8',
      }
    };

    authorize(conf)
      .then(result => {
        console.log(result);
        new TokenController().getUserToken((status, res) => {
          if (status === true) {
            app
              .get(
                `/services/discord/callback?code=${result.authorizationCode}`,
                config(res)
              )
              .then(res => {
                callback(true, res);
              })
              .catch(err => {
                callback(false, err);
              });
          }
        });
      })
      .catch(err => {
        callback(false, err);
      });
  }
}
