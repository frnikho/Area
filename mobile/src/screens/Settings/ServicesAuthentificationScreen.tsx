import React, { Component } from "react";
import { Box, Button, Card, ChevronLeftIcon, Heading, Text, VStack } from 'native-base';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ServicesAuthentificationsController from "../../controller/ServicesAuthentifications";
import Loading from "../../components/Loading";

export default class ServicesAuthentificationScreen extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            servicesAuth: undefined,
            refresh: false,
        };
        this.onRefresh = this.onRefresh.bind(this);
        this.getUserServicesAuth = this.getUserServicesAuth.bind(this);
    }

    componentDidMount() {
        this.getUserServicesAuth();
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState !== this.state) {
            this.getUserServicesAuth();
        }
    }

    /**
     * Get user's services auth
     *
     */
    getUserServicesAuth() {
        new ServicesAuthentificationsController().getAllUserServicesAuthentifications((status, response) => {
            if (status) {
                this.setState({ servicesAuth: response })
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
        this.getUserServicesAuth();
        this.wait(200).then(() => { this.setState({ refresh: false }) });
    }

    /**
     * delete service auth
    */
    onDeleteServiceAuth(authInfo: object) {
        new ServicesAuthentificationsController().deleteServiceAuthentification(authInfo.service, authInfo.key, (status, response) => {
            if (status) {
                this.getUserServicesAuth();
            }
        });
    }

    /**
     * Title render
     *
     * @returns
     */
    titleRender() {
        return (
            <VStack id="title" alignItems="center" style={styles.title}>
                <Text fontFamily="body" fontWeight={400} fontSize="3xl">Services Authentifications</Text>
            </VStack>
        );
    }

    /**
     * Create services auth button
     *
     * @returns
     */
    createServicesAuthButtonRender() {
        return (
            <View id="createServicesAuthButton" >
                <Button mode="contained" style={styles.createServicesAuthButton} onPress={() => this.props.navigation.navigate('createServiceAuthentification')}>
                    <Text fontFamily="body" fontWeight={600} fontSize="2xl" style={styles.createServicesAuthText}>Create Authentification</Text>
                </Button>
            </View>
        );
    }

    /**
     * List user's auth of service
     *
     * @param auths
     * @returns
     */
    authentificationsOfService(auths: object, serviceName: string) {
        if (auths === undefined) {
            return;
        }
        return auths.map((auth, i) => {
            return (
                <Card key={i} style={{ marginTop: 20, width: '100%', justifyContent: 'center', borderRadius: 10, backgroundColor: "#F6F8FA" }} >
                    <Text fontFamily="body" fontWeight={400} fontSize="xl">{auth.title}</Text>
                    <Text style={{ color: "#808080" }} fontFamily="body" fontWeight={400} fontSize="lg">{auth.description}</Text>
                    <Button
                        onPress={() => { this.onDeleteServiceAuth({ key: auth.uuid, service: serviceName }) }}
                        leftIcon={<Icon name="delete" size={40} color="black" />}
                        style={{ backgroundColor: 'transparent', alignSelf: 'flex-end', marginBottom: -10, left: 15, top: 5 }} />
                </Card>
            );
        });
    }

    /**
     * List services authentifications
     *
     * @returns
     */
    servicesAuthentificationsListRender() {
        if (this.state.servicesAuth === undefined) {
            return;
        }
        let noServicesAuth = true;
        new ServicesAuthentificationsController().userHaveServicesAuth(this.state.servicesAuth, (success) => {
            noServicesAuth = success;
        });
        if (noServicesAuth) {
            return (
                <Text bold style={styles.noServicesAuthText} fontFamily="body" fontWeight={400} fontSize="lg">You have no services authentifications</Text>
            );
        } else {
            return this.state.servicesAuth.map((service, i) => {
                if (service.count > 0) {
                    return (
                        <View key={i} style={{ marginLeft: 10, marginRight: 10 }} w="90%">
                            <Box>
                                <Heading bold fontSize="xl" p="4" pb="3" fontFamily="body" fontWeight={400} fontSize="2xl">{service.service.charAt(0).toUpperCase() + service.service.slice(1)}</Heading>
                                {this.authentificationsOfService(service.contexts, service.service)}
                            </Box>
                        </View >
                    );
                }
            })
        }
    }

    render() {
        return (
            <View id="servicesAuthentifications" style={styles.mainView}>
                <ChevronLeftIcon id="back" size="10" mt="0.5" style={styles.backArrow} onPress={() => this.props.navigation.goBack()} />
                {this.titleRender()}
                <ScrollView
                    contentContainerStyle={{ padding: 20 }}
                    refreshControl={<RefreshControl refreshing={this.state.refresh} onRefresh={this.onRefresh} />}
                >
                    {this.state.servicesAuth === undefined
                        ? <Loading />
                        : this.servicesAuthentificationsListRender()}
                </ScrollView>
                {this.createServicesAuthButtonRender()}
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
    noServicesAuthText: {
        marginTop: 25,
        marginLeft: 10,
        marginRight: 10,
    },
    createServicesAuthButton: {
        bottom: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        backgroundColor: "#222222",
        borderRadius: 15,
    },
    createServicesAuthText: {
        color: "#ffffff",
    },
});