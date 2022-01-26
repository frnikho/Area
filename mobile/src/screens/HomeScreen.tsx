import { Center, Text } from 'native-base';
import React, { Component } from 'react';

export default class HomeScreen extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Center>
                <Text>Home Screen</Text>
            </Center>
        )
    }
}