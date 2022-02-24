import { Center, HStack, Spinner } from 'native-base';
import React from "react";
import { View } from 'react-native';

export default class Loading extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View style={{ padding: '50%' }}>
                <Center>
                    <HStack space={2} justifyContent="center">
                        <Center>
                            <Spinner size={100} />
                        </Center>
                    </HStack>
                </Center>
            </View>
        );
    }

}