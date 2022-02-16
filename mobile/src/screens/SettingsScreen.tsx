import { Button, Toast, ChevronLeftIcon, Text, VStack } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import TokenController from '../controller/TokenController';

export default class SettingsScreen extends Component {

  constructor(props: any) {
    super(props);

    this.onDisconnect = this.onDisconnect.bind(this);
  }



  /**
   * Disconnect user
   */
  onDisconnect() {
    new TokenController().removeUserToken((tokenStatus, response) => {
      let title = tokenStatus ? "You are successfully disconnected" : "Error during disconnection";
      Toast.show({
        title: title,
        status: tokenStatus,
        duration: 2000,
      });
      if (tokenStatus)
        this.props.navigation.navigate('login');
    })
  }

  /**
   * Title render
   *
   * @returns
   */
  titleRender() {
    return (
      <VStack id="title" alignItems="center" style={styles.title}>
        <Text fontFamily="body" fontWeight={400} fontSize="4xl">Settings</Text>
      </VStack>
    );
  }

  /**
   * User's infor button
   *
   * @returns
   */
  userInfoButton() {
    return (
      <View id="userInfoButton">
        <Button style={styles.userInfoButton} onPress={() => { this.props.navigation.navigate('profile') }}>
          <Text fontFamily="body" fontWeight={600} fontSize="xl"><IconFontAwesome name="user" size={27} color="black" />   My informations</Text>
        </Button>
      </View>
    );
  }

  /**
   * User's services authentification button
   *
   * @returns
   */
  userServicesAuthentificationButton() {
    return (
      <View id="userServicesAuthentificationButton">
        <Button style={styles.userServicesAuthentificationButton} onPress={() => { this.props.navigation.navigate('servicesAuthentification') }}>
          <Text fontFamily="body" fontWeight={600} fontSize="xl"><IconFontAwesome name="shield" size={27} color="black" />   Services Authentification</Text>
        </Button>
      </View>
    );
  }

  /**
   * Logout button render
   *
   * @returns
   */
  logoutButtonRender() {
    return (
      <View id="logoutButton">
        <Button mode="contained" style={styles.logoutButton} onPress={() => this.onDisconnect()}>
          <Text fontFamily="body" fontWeight={600} fontSize="2xl" style={styles.logoutButtonText}>Logout</Text>
        </Button>
      </View>
    );
  }

  render() {
    return (
      <View id="profileMainView" style={styles.mainView}>
        <ChevronLeftIcon id="back" size="10" mt="0.5" style={styles.backArrow} onPress={() => this.props.navigation.goBack()} />
        {this.titleRender()}
        {this.userInfoButton()}
        {this.userServicesAuthentificationButton()}
        {this.logoutButtonRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  title: {
    marginTop: 10,
  },
  backArrow: {
    marginTop: 10,
    marginBottom: 0,
  },
  userInfo: {
    marginTop: 30,
    marginLeft: 20,
  },
  logoutButton: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    backgroundColor: "#222222",
    borderRadius: 15,
  },
  logoutButtonText: {
    color: "#ffffff",
  },
  userInfoButton: {
    backgroundColor: 'transparent',
    width: '53%',
    marginTop: 30,
    marginLeft: 10,
  },
  userServicesAuthentificationButton: {
    backgroundColor: 'transparent',
    width: '73%',
    marginTop: 30,
    marginLeft: 10,
  },
});