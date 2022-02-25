import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Button, HStack, Stack, Switch, Text, VStack } from 'native-base';
import AppletsController from '../../controller/AppletsController';
import { Card } from 'react-native-paper';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../../components/Loading';

export default class UserApplets extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            userApplets: undefined,
            refresh: false,
        }
        this.onRefresh = this.onRefresh.bind(this)
        this.getUserApplets = this.getUserApplets.bind(this)
    }

    componentDidMount() {
        this.getUserApplets();
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState !== this.state) {
            this.getUserApplets();
        }
    }
    
    /**
     * Get user's applets
     */
    getUserApplets() {
        new AppletsController().getUsersApplets((status, response) => {
            if (status) {
                this.setState({ userApplets: response });
            }
        });
    }

    /**
     * Wait before set refresh to false
     *
     * @param timeout
     * @returns
     */
    wait(timeout) {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    /**
     * Refresh user's applets
     */
    onRefresh() {
        this.setState({ refresh: true });
        this.getUserApplets();
        this.wait(200).then(() => { this.setState({ refresh: false }) });
    }

    /**
     * Delete user's applet
    */
    onDelete(appletInfo: object) {
        new AppletsController().deleteUserApplet(appletInfo.uuid, (status, response) => {
            if (status === false)
                console.log(response)
        });
    }

    /**
     * Enable or disable user applet
     * @param appletInfo
     */
    enableDisableUserApplet(appletInfo: object) {
        new AppletsController().toggleUserApplet(appletInfo.uuid, (status, response) => {
            if (status === false)
                console.log(response)
        });
    }

    /**
     * Generate user's applets
     */
    myApplets() {
        if (this.state.userApplets === undefined || this.state.userApplets.length === 0) {
            return (
                <Text bold style={styles.noAppletsText} fontFamily="body" fontWeight={400} fontSize="3xl">You have no applets</Text>
            );
        }
        return (this.state.userApplets.map((applet, i) => {
            let cardColor = applet.cardColor === undefined ? "#ffffff" : applet.cardColor;
            let textColor = applet.cardColor === undefined ? "#222222" : "#ffffff";
            return (
                <Card key={i} style={{ marginTop: 20, width: '100%', justifyContent: 'center', borderRadius: 15, backgroundColor: cardColor }}>
                    <Text color={textColor} style={styles.myAppletsCardText} fontFamily="body" fontWeight={400} fontSize="4xl">{applet.title}</Text>
                    <Text color={textColor} style={styles.myAppletsCardText} bold fontFamily="body" fontWeight={400} fontSize="3xl">If <Text fontFamily="body" fontWeight={400} fontSize="2xl">{applet.action}</Text><Text bold fontFamily="body" fontWeight={400} fontSize="3xl">,</Text></Text>
                    <Text color={textColor} style={styles.myAppletsCardText} bold fontFamily="body" fontWeight={400} fontSize="3xl">then <Text fontFamily="body" fontWeight={400} fontSize="2xl">{applet.reaction}</Text></Text>
                    <Stack space={3} alignItems="flex-end">
                        <HStack>
                            <Button
                                onPress={() => { this.onDelete({ uuid: applet.appletUuid }) }}
                                leftIcon={<Icon name="delete" size={35} color="white" />}
                                style={{ backgroundColor: 'transparent', alignSelf: 'flex-end' }} />
                            <Switch style={{ marginRight: 15 }} size="lg" colorScheme="white" onTrackColor="white" onThumbColor="white" defaultIsChecked={applet.enable} onValueChange={() => { this.enableDisableUserApplet({ uuid: applet.appletUuid }) }} />
                        </HStack>
                    </Stack>
                </Card>
            );
        }));
    }

    mainTextRender() {
        return (
            <VStack id="mainText" alignItems="center" style={styles.mainText}>
                <Text fontFamily="body" fontWeight={400} fontSize="4xl">My applets</Text>
            </VStack>
        );
    }

    render() {
        return (
            <>
                <View id="mainText" style={styles.mainText}>
                    {this.mainTextRender()}
                </View>
                <ScrollView
                    contentContainerStyle={{ padding: 20 }}
                    refreshControl={<RefreshControl refreshing={this.state.refresh} onRefresh={this.onRefresh} />}
                >
                    <View id="myApplets" style={styles.myApplets}>
                        {this.state.userApplets === undefined ? <Loading /> : this.myApplets()}
                    </View>
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    mainText: {
        marginTop: 5,
    },
    myAppletsCardText: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    noAppletsText: {
        marginTop: 25,
        marginLeft: 10,
        marginRight: 10,
    },
    mainView: {
        flex: 1,
    },
    myApplets: {
        flexDirection: "column",
        flexWrap: "wrap",
    },
});