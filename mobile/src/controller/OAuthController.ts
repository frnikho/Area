import {authorize} from 'react-native-app-auth';

export default class OAuthController {
  public slackOAuth() {
    const config = {
      clientId: process.env.SLACK_SERVICES_CLIENT_ID, // found under App Credentials
      scopes: [
        'channels:read',
        'chat:write',
        'chat:write.public',
        'groups:read',
        'im:read',
        'mpim:read',
      ],
      additionalHeaders: {Accept: 'application/json'},
      skipCodeExchange: true,
      responseType: 'code',
      redirectUrl: process.env.SLACK_SERVICES_REDIRECT_URL,
      serviceConfiguration: {
        authorizationEndpoint: 'https://slack.com/oauth/v2/authorize?',
      },
    };

    authorize(config).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
  }

  public twitterOAuth() {}

  public discordOAuth() {}
}
