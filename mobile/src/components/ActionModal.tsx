import { Center } from "native-base";
import React from "react";
import { Text } from "react-native";

export default class ActionModal extends React.Component {
    constructor(props: any) {
        super(props);
    }

    renderBody() {
        throw new Error("This method must be overridden");
    }

    render() {
        return (
            <Center>
                <Text>{this.props.action.description === undefined || this.props.action.description.length === 0 ? "No description is available for the moment" : this.props.action.description }</Text>
                {this.renderBody()}
            </Center>
        );
    }
}