import { Button, Center, Icon, Text } from 'native-base';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HomeScreen extends Component {
    constructor(props: any) {
        super(props);
    }

    async onDisconnect() {
        await AsyncStorage.removeItem("@token");
        this.props.navigation.navigate('login')
    }

    render() {
        return (
            <Center>
                <Text>Home Screen</Text>
                <Button colorScheme="error" onPress={this.onDisconnect} >Logout</Button>
            </Center>
        )
    }
}