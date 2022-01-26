/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NativeBaseProvider, Box } from 'native-base';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import {is_logged_in} from './auth'

const Stack = createNativeStackNavigator();

export default class App extends Component {

  state: {
    isLoggedIn: boolean,
  }

  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    is_logged_in((valid: boolean) => {
      if (valid) {
        this.setState({
          isLoggedIn: true,
        })
      } else {
        this.setState({
          isLoggedIn: false,
        })
      }
    })
    // console.log(this.state.initialRoute)
  }

  authNavigation() {
    return (
      <Stack.Navigator initialRouteName="login" screenOptions={{headerShown: false}} >
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
      </Stack.Navigator>
    )
  }

  homeNavigation() {
    return (
      <Stack.Navigator initialRouteName="home" screenOptions={{headerShown: false}} >
        <Stack.Screen name="home" component={HomeScreen} />
      </Stack.Navigator>
    )
  }

  render() {
    return (
      <NavigationContainer>
        <NativeBaseProvider>
          {this.state.isLoggedIn ? this.homeNavigation() : this.authNavigation()}
        </NativeBaseProvider>
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
