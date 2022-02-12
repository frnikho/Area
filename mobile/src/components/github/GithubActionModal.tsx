import {Center, Button, Stack} from 'native-base';
import React from 'react';
import {Text, TouchableHighlightBase} from 'react-native';
import ActionModal from '../ActionModal';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginController from '../../controller/LoginController';

export default class GithubActionModal extends ActionModal {
  constructor(props: any) {
    super(props);
    this.state = {
      isConnected: false,
    };

    this.onLoginGithub = this.onLoginGithub.bind(this);
  }

  onLoginGithub() {
    new LoginController().githubLogin((status, res) => {
      if (status) {
        console.log(res);
        this.setState({isConnected: status});
      } else {
        console.log(res);
        this.setState({isConnected: true});
      }
    });
  }

  renderGithubLogin() {
    if (this.state.isConnected) {
      return <Icon name="md-checkmark-circle-sharp" size={25} color="green" />;
    }
    return (
      <Button
        onPress={this.onLoginGithub}
        leftIcon={<Icon name="logo-github" size={25} color="white" />}
        style={{
          backgroundColor: '#111833',
        }}>
        Github
      </Button>
    );
  }

  renderBody() {
    return <Center>{this.renderGithubLogin()}</Center>;
  }
}
