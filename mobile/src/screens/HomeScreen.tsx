import { Button, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import UserApplets from './UserAppletsScreen';

export default class HomeScreen extends Component {

  constructor(props: any) {
    super(props);
    // this.onDisconnect = this.onDisconnect.bind(this);
  }

  // onDisconnect() {
  //   AsyncStorage.removeItem('@token').then(() => {
  //     Toast.show({
  //       title: 'You are successfully disconnected',
  //       status: 'success',
  //       description: 'You can now login.',
  //       duration: 2000,
  //     });
  //     this.props.navigation.navigate('login');
  //   });
  // }


  /**
   * Create Applet Button Render
   *
   */
  createAppletButtonRender() {
    return (
      <View id="createApplet" >
        <Button mode="contained" style={styles.createAppletButton} onPress={() => this.props.navigation.navigate('applets')}>
          <Text fontFamily="body" fontWeight={600} fontSize="2xl" style={styles.createAppletText}>Create</Text>
        </Button>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainView}>
        <UserApplets />
        {this.createAppletButtonRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  createAppletButton: {
    bottom: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    backgroundColor: "#222222",
    borderRadius: 15,

  },
  createAppletText: {
    color: "#ffffff",
  },
});
