import {
  Button,
  Center,
  Toast,
  Text,
  VStack,
  Fab,
  Box,
  FormControl,
  Input,
} from 'native-base';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, View, ScrollView } from 'react-native';
import { Subheading } from 'react-native-paper';
import app from '../axios_config';
import { is_logged_in } from '../auth';


const Separator = () => (
  <View style={styles.separator} />
);

export default class ProfileScreen extends Component {
  state: {
    firstName: String | undefined,
    lastName: String | undefined,
    email: String | undefined,
    password: String | undefined,
    newPassword: String | undefined,
    reNewPassword: String | undefined
  };

  constructor(props: any) {
    super(props);
    this.state = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
      newPassword: undefined,
      reNewPassword: undefined,
    };
    // app.get(`/me`
    // ).then((response: any) => {
    //   if (response.status === 200) {
    //     console.log(response.json())
    //   } else {
    //   }
    // }).catch((err: any) => {
    //   console.log(err);
    //   Toast.show({
    //     title: err.response.data.error,
    //     status: "warning",
    //     description: "Please try again !",
    //   })
    // })
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangePassword() {
    if (this.state.password === undefined || this.state.reNewPassword === undefined || this.state.newPassword === undefined) {
      return;
    }
    // if (this.password !== app.get('/me')) VERIF PASSWORD TO CONTINUE
    if (this.state.newPassword !== this.state.reNewPassword) {
      Toast.show({
        title: "Password does not match",
        status: "warning",
        description: "Please try again !",
      })
      return;
    }
    // POST a new password
    // app.post(`/changePassword`, {
    //   email: this.state.email,
    //   password: this.state.password,
    //   firstname: this.state.firstName,
    //   lastname: this.state.lastName,
    // }).then((response: any) => {
    //   if (response.status === 200) {
    //     Toast.show({
    //       title: "Password succesfuly changed",
    //       status: "success",
    //       description: "You can now login with your new password to your account.",
    //       duration: 3000
    //     });
    //     setTimeout(() => {
    //       this.props.navigation.navigate('dashboard')
    //     }, 1000);
    //   } else {
    //   }
    // }).catch((err: any) => {
    //   console.log(err);
    //   Toast.show({
    //     title: err.response.data.error,
    //     status: "warning",
    //     description: "Please try again !",
    //   })
    // })
  }

  mainTextRender() {
    return (
        <VStack id="mainText" alignItems="center" style={styles.mainText}>
            <Text fontFamily="body" fontWeight={500} fontSize ="3xl">Profile</Text>
            <Separator/>
        </VStack>
    );
  }

  descriptionTextRender() {
    return (
        <VStack id="descriptionText" style={styles.mainText}>
            <Separator/>
            <Text fontFamily="body" fontWeight={200} fontSize ="2xl">First name</Text>
            <Separator/>
            <Text fontFamily="body" fontWeight={200} fontSize ="2xl">Last name</Text>
            <Separator/>
            <Text fontFamily="body" fontWeight={200} fontSize ="2xl">E-Mail</Text>
            <Separator/>
        </VStack>
    );
  }

  createPasswordButtonRender() {
    return (
      <View id="changePassword" >
          <FormControl>
            <Text fontFamily="body" fontWeight={200} fontSize ="2xl">Actual Password</Text>
            <Input type="password" onChangeText={(val) => this.setState({password: val})}/>
          </FormControl>
          <FormControl>
            <Text fontFamily="body" fontWeight={200} fontSize ="2xl">New Password</Text>
            <Input type="password" onChangeText={(val) => this.setState({newPassword: val})} />
          </FormControl>
          <FormControl>
            <Text fontFamily="body" fontWeight={200} fontSize ="2xl">Retype New Password</Text>
            <Input type="password" onChangeText={(val) => this.setState({reNewPassword: val})} />
          </FormControl>
          <Button mode="contained" style={styles.createPasswordButton} onPress={this.onChangePassword}>
            <Text style={styles.createPasswordText}>Change Password</Text>
          </Button>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.mainTextRender()}
        {this.descriptionTextRender()}
        {this.createPasswordButtonRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
  },
  safeAreaView: {
    backgroundColor: "#DCDCDC",
  },
  createPasswordButton: {
        bottom: -10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        backgroundColor: "#222222",
  },
  createPasswordText: {
    color: "#ffffff",
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  myApplets: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  mainText: {
    marginTop:0,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
