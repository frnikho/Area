import {Button, Center, Toast, Text} from 'native-base';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HomeScreen extends Component {
  constructor(props: any) {
    super(props);
    this.onDisconnect = this.onDisconnect.bind(this);
  }

  onDisconnect() {
    AsyncStorage.removeItem('@token').then(() => {
      Toast.show({
        title: 'You are successfully disconnected',
        status: 'success',
        description: 'You can now login.',
        duration: 2000,
      });
      this.props.navigation.navigate('login');
    });
  }

  render() {
    return (
      <Center>
        <Text>Home Screen</Text>
        <Button colorScheme="error" onPress={this.onDisconnect}>
          Logout
        </Button>
      </Center>
    );
  }
}
