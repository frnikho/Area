import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import ServicesScreen from './screens/Applets/ServicesAppletsScreen';
import AppletsScreen from './screens/Applets/AppletsScreen';
import SettingsScreen from './screens/Settings/SettingsScreen';
import ProfileScreen from './screens/Settings/ProfileScreen';
import ServicesAuthentificationScreen from './screens/Settings/ServicesAuthentificationScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

const Router = ({isLoggedIn}:boolean) => {
    // console.log(isLoggedIn['isLoggedIn']);
    // console.log(isLoggedIn == true ? 'home' : 'login')
    return (
        <Stack.Navigator initialRouteName={isLoggedIn === false ? 'login' : 'home'} screenOptions={{headerShown: false}} >
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="applets" component={AppletsScreen} />
          <Stack.Screen name="services" component={ServicesScreen} />
          <Stack.Screen name="settings" component={SettingsScreen} />
          <Stack.Screen name="profile" component={ProfileScreen} />
          <Stack.Screen name="servicesAuthentification" component={ServicesAuthentificationScreen} />
        </Stack.Navigator>
    );
}

export default Router;