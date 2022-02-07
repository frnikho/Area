import { Center, Text } from 'native-base';
import React, {Component} from 'react';

export default class ServicesScreen extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Center>
                <Text fontSize="5xl" >Services</Text>
            </Center>
        );
    }
}