import { Center, HStack, Spinner, Text, ChevronLeftIcon } from 'native-base';
import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ServiceCard from '../../components/ServiceCard';
import ServicesController from '../../controller/ServicesController';
import ActionsScreen from './ActionsScreen';
import ReactionsScreen from './ReactionsScreen';

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
  }

  onSave(action: object) {
    const { onSelected } = this.props.route.params;
    this.setState({ onShowModal: false })
    onSelected(action);
  }

  onClose() {
    this.setState({ onShowModal: false });
  }

  componentDidMount() {
    new ServicesController().getAboutPointJSON((status, response) => {
      if (status) {
        this.setState({ services: response.data.server.services });
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

  renderServicesCards() {
    const { modalContext } = this.props.route.params;
    return (
      <ScrollView style={{ padding: 20, flex: 1 }}>
        <Text fontFamily="body" fontWeight={600} fontSize="4xl">
          Services
        </Text>
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
            } else if (modalContext === 'reactions' && service.reactions.length !== 0) {
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
        {modalContext === 'actions' ? <ActionsScreen service={this.state.currentService} onClose={this.onClose} onSave={this.onSave} /> : <ReactionsScreen service={this.state.currentService} onClose={this.onClose} onSave={this.onSave} />}
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
          ? this.renderLoading()
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
