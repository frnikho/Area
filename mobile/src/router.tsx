import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ServicesScreen from './screens/ServicesScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

const Router = ({isLoggedIn}:boolean) => {
    // console.log(isLoggedIn['isLoggedIn']);
    // console.log(isLoggedIn == true ? 'home' : 'login')
    return (
        <Stack.Navigator initialRouteName={isLoggedIn == true ? 'home' : 'login'} screenOptions={{headerShown: false}} >
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="services" component={ServicesScreen} />
        </Stack.Navigator>
    );
}

export default Router;