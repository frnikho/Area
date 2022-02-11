import { Button, Toast, ChevronLeftIcon, Text, VStack } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import UserController from '../controller/UserController';
import TokenController from '../controller/TokenController';

export default class ProfileScreen extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      uuid: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
    };
    this.onDisconnect = this.onDisconnect.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
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
   * Get user's info
   */
  getUserInfo() {
    new UserController().getUserInfo((status, response) => {
      if (status) {
        this.setState({ uuid: response.uuid, firstName: response.firstname, lastName: response.lastname, email: response.email })
      }
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
        <Text fontFamily="body" fontWeight={400} fontSize="4xl">Profile</Text>
      </VStack>
    );
  }

  /**
   * User's info render
   *
   * @returns
   */
  userInfoRender() {
    return (
      <View id="userInfo">
        <Text style={styles.userInfo} fontFamily="body" fontWeight={400} fontSize="xl"><IconFontAwesome name="user" size={25} color="black" /> First name: {this.state.firstName === undefined ? "unknown" : this.state.firstName} </Text>
        <Text style={styles.userInfo} fontFamily="body" fontWeight={400} fontSize="xl"><IconFontAwesome name="user" size={25} color="black" /> Last name: {this.state.lastName === undefined ? "unknown" : this.state.lastName} </Text>
        <Text style={styles.userInfo} fontFamily="body" fontWeight={400} fontSize="xl"><Icon name="mail" size={25} color="black" /> Email: {this.state.email === undefined ? "unknown" : this.state.email} </Text>
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
      <View id="profileMainViex" style={styles.mainView}>
        <ChevronLeftIcon id="back" size="10" mt="0.5" style={styles.backArrow} onPress={() => this.props.navigation.goBack()} />
        {this.titleRender()}
        {this.userInfoRender()}
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
});
