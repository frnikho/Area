import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import ServicesScreen from './screens/Applets/ServicesAppletsScreen';
import AppletsScreen from './screens/Applets/AppletsScreen';
import SettingsScreen from './screens/Settings/SettingsScreen';
import ProfileScreen from './screens/Settings/ProfileScreen';
import ServicesAuthentificationScreen from './screens/Settings/ServicesAuthentificationScreen';
import ServicesSettingsScreen from './screens/Settings/ServicesSettingsScreen';
import CreateServiceAuthentification from './screens/Settings/CreateServiceAuthentificationScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

/**
 * @description Handle routes
 * @param param0
 * @returns
 */
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
          <Stack.Screen name="settingsServices" component={ServicesSettingsScreen} />
          <Stack.Screen name="createServiceAuthentification" component={CreateServiceAuthentification} />
        </Stack.Navigator>
    );
}

export default Router;