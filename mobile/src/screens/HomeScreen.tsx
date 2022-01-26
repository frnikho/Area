import { Button, Center, Icon, Text } from 'native-base';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HomeScreen extends Component {
    constructor(props: any) {
        super(props);
        this.onDisconnect = this.onDisconnect.bind(this);
    }

    onDisconnect() {
        AsyncStorage.removeItem("@token").then(() => {
            this.props.navigation.navigate('login')
        })
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