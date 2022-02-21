import React, { Component } from "react";
import { ScrollView, View, StyleSheet } from 'react-native';
import { Center, HStack, Spinner, Text, ChevronLeftIcon } from 'native-base';
import ServicesController from '../../controller/ServicesController';
import ServiceCard from '../../components/ServiceCard';
import LoginController from "../../controller/LoginController";

export default class ServicesSettingsScreen extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            services: undefined,
        };
    }

    componentDidMount() {
        new ServicesController().getAboutPointJSON((status, response) => {
            if (status) {
                this.setState({ services: response.data.server.services });
                // console.log(response.data.server.services)
            } else {
                console.error(response);
            }
        });
    }

    renderLoading() {
        return (
            <View style={{ padding: '50%' }}>
                <Center>
                    <HStack space={2} justifyContent="center">
                        <Center>
                            <Spinner accessibilityLabel="Loading posts" size={100} />
                        </Center>
                    </HStack>
                </Center>
            </View>
        );
    }

    async onGithubLogin() {
        await new LoginController().githubLogin((status, res) => {
            if (status === true) {
                console.log(res);
            } else {
                console.log(res);
            }
        })
    }

    async onGoogleLogin() {
        await new LoginController().googleLogin((status, res) => {
            if (status === true) {
                console.log(res);
            } else {
                console.log(res);
            }
        })
    }

    async onDiscordLogin() {
        await new LoginController().discordLogin((status, res) => {
            if (status === true) {
                console.log(res);
            } else {
                console.log(res);
            }
        })
    }

    async onPressService(service: object) {
        const { onSelected } = this.props.route.params;
        const servicesLogins = {
            Github: this.onGithubLogin,
            Gmail: this.onGoogleLogin,
            Discord: this.onDiscordLogin
        };
        await servicesLogins[service.name]();
        onSelected(service);
    }

    renderServicesCards() {
        return (
            <ScrollView style={{ padding: 20, flex: 1 }}>
                <Text fontFamily="body" fontWeight={600} fontSize="4xl">
                    Services
                </Text>
                <View style={styles.row}>
                    {this.state.services.map((service, i) => {
                        return (
                            <View style={styles.card} key={i}>
                                <ServiceCard
                                    backgroundColor={service.color}
                                    logo={'https://area-backend.nikho.dev/static/' + service.icon}
                                    name={service.name}
                                    onPress={async () => await this.onPressService(service)}
                                />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        );
    }

    render() {
        return (
            <>
                <ChevronLeftIcon
                    id="back"
                    size="10"
                    mt="0.5"
                    style={styles.backArrow}
                    onPress={() => this.props.navigation.goBack()}
                />
                {this.state.services === undefined
                    ? this.renderLoading()
                    : this.renderServicesCards()}
            </>
        );
    }
}

const styles = StyleSheet.create({
    backArrow: {
        marginTop: 10,
        marginBottom: 0,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    card: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginHorizontal: '1%',
        marginBottom: 6,
        minWidth: '48%',
        textAlign: 'center',
    },
});