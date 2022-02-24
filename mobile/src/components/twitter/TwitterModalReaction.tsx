import { Button, Center } from 'native-base';
import React from 'react';
import ReactionModal from '../ReactionModal';
import Icon from 'react-native-vector-icons/Ionicons';
// const pkceChallenge = require('pkce-challenge');


export default class TwitterModalReaction extends ReactionModal {
  constructor(props: any) {
    super(props);
  }

  onLoginTwitter() {
    // const pkce = pkceChallenge();
    // const config = {
    //     issuer: "https://twitter.com/i/oauth2/authorize",
    //     redirect_uri: "com.area://callback",
    //     client_id: process.env.TWITTER_SERVICES_CLIENT_ID,
    //     response_type: "code",
    //     scope: ["tweet.write", "tweet.read", "users.read", "offline.access"],
    //     state: "state",
    //     code_challenge: pkce["code_challenge"],
    //     code_challenge_method: "s256",
    // }

    // authorize(config).then(res => {
    //     console.log(res);
    // }).catch(err => {
    //     console.log(err);
    // })
  }

  renderTwitterLogin() {
    return (
      <Button
        onPress={this.onLoginTwitter}
        leftIcon={<Icon name="logo-twitter" size={25} color="white" />}
        style={{
          backgroundColor: '#00acee',
        }}>
        Twitter
      </Button>
    );
  }

  renderBody() {
      return (<Center>{this.renderTwitterLogin()}</Center>);
  }
}
