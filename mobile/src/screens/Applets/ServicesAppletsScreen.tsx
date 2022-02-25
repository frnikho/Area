import { Button, Text, ChevronLeftIcon } from 'native-base';
import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ServiceCard from '../../components/ServiceCard';
import ServicesController from '../../controller/ServicesController';
import ActionsScreen from './ActionsScreen';
import ReactionsScreen from './ReactionsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loading from '../../components/Loading';

export default class ServicesAppletsScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      services: undefined,
      currentService: undefined,
      onShowModal: false,
    };
    this.onSave = this.onSave.bind(this);
    this.onClose = this.onClose.bind(this);
    this.renderServicesCards = this.renderServicesCards.bind(this);
    this.getServices = this.getServices.bind(this);
  }

  onSave(action: object, param: object) {
    const { onSelected } = this.props.route.params;
    this.setState({ onShowModal: false })
    onSelected(action, param);
  }

  onClose() {
    this.setState({ onShowModal: false });
  }

  componentDidMount() {
    this.getServices();
  }

  /**
   * Get services
   */
  getServices() {
    new ServicesController().getAboutPointJSON((status, response) => {
      if (status) {
        this.setState({ services: response.data.server.services });
      } else {
        console.error(response);
      }
    });
  }

  renderServicesCards() {
    const { modalContext } = this.props.route.params;
    return (
      <ScrollView style={{ padding: 20, flex: 1 }}>
        <Text fontFamily="body" fontWeight={600} fontSize="4xl">
          Services
        </Text>
        <Button
          onPress={() => this.props.navigation.navigate('servicesAuthentification')}
          leftIcon={<Icon name="settings" size={40} color="black" />}
          style={styles.settingsButton} />
        <View style={styles.row}>
          {this.state.services.map((service, i) => {
            if (modalContext === 'actions' && service.actions.length !== 0) {
              return (
                <View style={styles.card} key={i}>
                  <ServiceCard
                    backgroundColor={service.color}
                    logo={'https://area-backend.nikho.dev/static/' + service.icon}
                    name={service.name}
                    onPress={() =>
                      this.setState({ onShowModal: true, currentService: service })
                    }
                  />
                </View>
              );
            } else if (modalContext === 'reactions' && service.reactions && service.reactions.length !== 0) {
              return (
                <View style={styles.card} key={i}>
                  <ServiceCard
                    backgroundColor={service.color}
                    logo={'https://area-backend.nikho.dev/static/' + service.icon}
                    name={service.name}
                    onPress={() =>
                      this.setState({ onShowModal: true, currentService: service })
                    }
                  />
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
    );
  }

  renderModal() {
    const { modalContext } = this.props.route.params;
    if (this.state.currentService === undefined || this.state.onShowModal === false) {
      return;
    }
    return (
      <>
        {modalContext === 'actions' ? <ActionsScreen navigation={this.props.navigation} service={this.state.currentService} onClose={this.onClose} onSave={this.onSave} /> : <ReactionsScreen service={this.state.currentService} onClose={this.onClose} onSave={this.onSave} />}
      </>
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
          ? <Loading />
          : this.renderServicesCards()}
        {this.renderModal()}
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
    marginTop: 20,
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
  settingsButton: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    marginTop: -52,
  },
});
