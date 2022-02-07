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
                <Button mode="contained" style={styles.actionButton}>
                    <Text fontFamily="body" fontWeight={600} fontSize ="4xl" style={styles.actionText}>Action</Text>
                </Button>
            </View>
        );
    }

    reactionButtonRender() {
        return (
            <View id="reaction">
                <Button mode="contained" style={styles.reactionButton}>
                    <Text fontFamily="body" fontWeight={600} fontSize="4xl" style={styles.reactionText}>Reaction</Text>
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
                <ChevronLeftIcon id="back" size="10" mt="0.5" style={styles.backArrow} onPress={() => this.props.navigation.navigate('home')}/>
                {this.mainTextRender()}
                {this.actionButtonRender()}
                {this.reactionButtonRender()}
            </View>
        );
      }
}

const styles = StyleSheet.create({
    appletsMainView: {
      backgroundColor: "#DCDCDC",
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
        backgroundColor: "#222222",
    },
    reactionText: {
        color: "#ffffff",
    }
});