import React, { Component } from 'react';
import { Button, ChevronLeftIcon, Text, VStack } from 'native-base';
import { StyleSheet, View } from 'react-native';

export default class AppletsScreen extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            action: undefined,
            reaction: undefined,
        }
        this.onActionSelected = this.onActionSelected.bind(this)
        this.onReactionSelected = this.onReactionSelected.bind(this)
    }

    onActionSelected(action: object) {
        this.setState({ action: action });
        console.log(action)
        this.props.navigation.goBack();
    }

    onReactionSelected(reaction: object) {
        this.setState({ reaction: reaction });
        console.log(reaction)
        this.props.navigation.goBack();
    }

    actionButtonRender() {
        if (this.state.action === undefined) {
            return (
                <View id="action">
                    <Button mode="contained" style={styles.actionButton} onPress={() => this.props.navigation.navigate('services', {modalContext: 'actions', onSelected: this.onActionSelected})}>
                        <Text fontFamily="body" fontWeight={600} fontSize ="4xl" style={styles.actionText}>If this</Text>
                    </Button>
                </View>
            );
        } else {
            return (
                <View id="action">
                    <Button mode="contained" style={styles.actionButton} onPress={() => this.props.navigation.navigate('services', {modalContext: 'actions', onSelected: this.onActionSelected})}>
                        <Text fontFamily="body" fontWeight={600} fontSize ="4xl" style={styles.actionText}>{this.state.action.name}</Text>
                    </Button>
                </View>
            );
        }
    }

    reactionButtonRender() {
        if (this.state.reaction === undefined) {
            return (
                <View id="reaction">
                    <Button mode="contained" style={styles.reactionButton} onPress={() => this.props.navigation.navigate('services', {modalContext: 'reactions', onSelected: this.onReactionSelected})}>
                        <Text fontFamily="body" fontWeight={600} fontSize="4xl" style={styles.reactionText}>Then that</Text>
                    </Button>
                </View>
            );
        } else {
            return (
                <View id="reaction">
                    <Button mode="contained" style={styles.reactionButton} onPress={() => this.props.navigation.navigate('services', {modalContext: 'reactions', onSelected: this.onReactionSelected})}>
                        <Text fontFamily="body" fontWeight={600} fontSize ="4xl" style={styles.reactionText}>{this.state.reaction.name}</Text>
                    </Button>
                </View>
            );
        }
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