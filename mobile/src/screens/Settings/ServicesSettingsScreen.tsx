import React, {Component} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import { Text, ChevronLeftIcon} from 'native-base';
import ServicesController from '../../controller/ServicesController';
import ServiceCard from '../../components/ServiceCard';
import LoginController from '../../controller/LoginController';
import Loading from '../../components/Loading';

export default class ServicesSettingsScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      services: undefined,
    };

    this.onGithubLogin = this.onGithubLogin.bind(this);
  }

  /**
   * @description Load all service
   */
  componentDidMount() {
    new ServicesController().getAboutPointJSON((status, response) => {
      if (status) {
        this.setState({services: response.data.server.services});
        // console.log(response.data.server.services)
      } else {
        console.error(response);
      }
    });
  }

  /**
   * @description Github login
   * @param callback
   */
  onGithubLogin(callback: (token_data: object) => void) {
    new LoginController().githubLoginService((status, res) => {
      if (status === true) {
        callback(res.data.token);
      } else {
        console.log(res);
      }
    });
  }

  /**
   * @description Google login
   * @param callback
   */
  onGoogleLogin(callback: (token_data: object) => void) {
    new LoginController().googleLogin((status, res) => {
      if (status === true) {
        console.log(res);
      } else {
        console.log(res);
      }
    });
  }

  /**
   * @description Discord login
   * @param callback
   */
  onDiscordLogin(callback: (token_data: object) => void) {
    new LoginController().discordLogin((status, res) => {
      if (status === true) {
        callback(res.data.token)
      } else {
        console.log(res);
      }
    });
  }

  /**
   * @description Twitter login
   * @param callback
   */
  onTwitterLogin(callback: (token_data: object) => void) {
    new LoginController().twitterLogin((status, res) => {
      if (status) {
        callback(res.data.token);
      } else {
        console.log(res);
      }
    })
  }

  onSpotifyLogin(callback: (token_data: object) => void) {
    new LoginController().spotifyLogin((status, res) => {
      if (status === true) {
        callback(res.data.token);
      } else {
        console.log(res);
      }
    })
  }

  onEpitechLogin(callback: (token_data: object) => void) {
    callback({epitech: true});
  }

  /**
   * @description Call good service login. Send data to other screen
   * @param service
   */
  onPressService(service: object) {
    const {onSelected} = this.props.route.params;
    const servicesLogins = {
      github: this.onGithubLogin,
      gmail: this.onGoogleLogin,
      discord: this.onDiscordLogin,
      twitter: this.onTwitterLogin,
      spotify: this.onSpotifyLogin,
      epitech_intra: this.onEpitechLogin,
    };
    servicesLogins[service.type]((token_data: object) => {
      onSelected(service, token_data);
    });
  }

  /**
   * @description Render services cards
   * @returns
   */
  renderServicesCards() {
    return (
      <ScrollView style={{padding: 20, flex: 1}}>
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

  /**
   * @description render
   * @returns
   */
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
          ? <Loading />
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
