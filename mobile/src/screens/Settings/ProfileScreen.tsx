import React, { Component } from 'react';
import { ChevronLeftIcon, Text, VStack } from 'native-base';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import UserController from '../../controller/UserController';

export default class UserInfoScreen extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            uuid: undefined,
            firstName: undefined,
            lastName: undefined,
            email: undefined,
        };
    }

    componentDidMount() {
        this.getUserInfo();
    }

    /**
     * Get user's info
    */
    getUserInfo() {
        new UserController().getUserInfo((status, response) => {
            if (status) {
                this.setState({ uuid: response.uuid, firstName: response.firstname, lastName: response.lastname, email: response.email })
            }
        })
    }

    /**
     * User's info render
     *
     * @returns
    */
    userInfoRender() {
        return (
            <View id="userInfo">
                <Text style={styles.userInfo} fontFamily="body" fontWeight={400} fontSize="xl"><IconFontAwesome name="user" size={25} color="black" /> First name: {this.state.firstName === undefined ? "unknown" : this.state.firstName} </Text>
                <Text style={styles.userInfo} fontFamily="body" fontWeight={400} fontSize="xl"><IconFontAwesome name="user" size={25} color="black" /> Last name: {this.state.lastName === undefined ? "unknown" : this.state.lastName} </Text>
                <Text style={styles.userInfo} fontFamily="body" fontWeight={400} fontSize="xl"><Icon name="mail" size={25} color="black" /> Email: {this.state.email === undefined ? "unknown" : this.state.email} </Text>
            </View>
        );
    }

    /**
     * Title render
     *
     * @returns
     */
    titleRender() {
        return (
            <VStack id="title" alignItems="center" style={styles.title}>
                <Text fontFamily="body" fontWeight={400} fontSize="4xl">My informations</Text>
            </VStack>
        );
    }

    render() {
        return (
            <View id="userInfoMainView" style={styles.mainView}>
                <ChevronLeftIcon id="back" size="10" mt="0.5" style={styles.backArrow} onPress={() => this.props.navigation.goBack()} />
                {this.titleRender()}
                {this.userInfoRender()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    title: {
        marginTop: 10,
    },
    backArrow: {
        marginTop: 10,
        marginBottom: 0,
    },
    userInfo: {
        marginTop: 30,
        marginLeft: 20,
    },
});