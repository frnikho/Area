import React, { Component } from 'react';
import { Button, ChevronLeftIcon, Text, VStack, Flex} from 'native-base';
import { StyleSheet, View } from 'react-native';

export default class AppletsScreen extends Component {

    constructor(props: any) {
        super(props);
    }

    actionButtonRender() {
        return (
            <View id="action">
                <Button mode="contained" style={styles.actionButton} onPress={() => this.props.navigation.navigate('services', {modalContext: 'actions'})}>
                    <Text fontFamily="body" fontWeight={600} fontSize ="4xl" style={styles.actionText}>If this</Text>
                </Button>
            </View>
        );
    }

    reactionButtonRender() {
        return (
            <View id="reaction">
                <Button mode="contained" style={styles.reactionButton} onPress={() => this.props.navigation.navigate('services', {modalContext: 'reactions'})}>
                    <Text fontFamily="body" fontWeight={600} fontSize="4xl" style={styles.reactionText}>Then that</Text>
                </Button>
            </View>
        );
    }

    mainTextRender() {
        return (
            <VStack id="mainText" alignItems="center" style={styles.mainText}>
                <Text fontFamily="body" fontWeight={400} fontSize ="3xl">Create your own</Text>
            </VStack>
        );
    }

    render() {
        return (
            <View id="appletsMainView" style={styles.appletsMainView}>
                <ChevronLeftIcon id="back" size="10" mt="0.5" style={styles.backArrow} onPress={() => this.props.navigation.goBack()}/>
                {this.mainTextRender()}
                {this.actionButtonRender()}
                {this.reactionButtonRender()}
            </View>
        );
      }
}

const styles = StyleSheet.create({
    appletsMainView: {
      flex: 1,
    },
    backArrow: {
        marginTop: 10,
        marginBottom: 0,
    },
    mainText: {
        marginTop:0,
    },
    actionButton: {
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
        backgroundColor: "#222222",
    },
    actionText: {
        color: "#ffffff",
    },
    reactionButton: {
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
        backgroundColor: "#999999",
    },
    reactionText: {
        color: "#ffffff",
    }
});