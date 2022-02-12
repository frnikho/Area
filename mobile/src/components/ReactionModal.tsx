import { Center } from "native-base";
import React from "react";
import { Text } from "react-native";

export default class ReactionModal extends React.Component {
    constructor(props: any) {
        super(props);
    }

    renderBody() {
        throw new Error("This method must be overridden");
    }

    render() {
        return (
            <Center>
                <Text>{this.props.reaction.description}</Text>
                {this.renderBody()}
            </Center>
        );
    }
}