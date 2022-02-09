import {
  Center,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
  ChevronLeftIcon,
  Button,
  Modal,
  FormControl,
  Input,
} from 'native-base';
import React, {Component} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import ServiceCard from '../components/ServiceCard';
import app from '../axios_config';

export default class ServicesScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      services: undefined,
      showModal: false,
      currentService: undefined,
      currentChoice: undefined,
    };
  }

  componentDidMount() {
    app
      .get('/about.json')
      .then((response: any) => {
        this.setState({services: response.data.server.services});
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  renderLoading() {
    return (
      <View style={{padding: '50%'}}>
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
                  backgroundColor="#4287f5"
                  name={service.name}
                  onPress={() =>
                    this.setState({showModal: true, currentService: service})
                  }
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  renderList() {
    const {modalContext} = this.props.route.params;

    if (modalContext == 'actions') {
      return (
        <>
          {this.state.currentService.actions.length <= 0 ? (
            <Text>
              No actions is available with {this.state.currentService.name}
            </Text>
          ) : (
            this.state.currentService.actions.map(
              (action: object, i: number) => {
                return <Button key={i}>{action.name}</Button>;
              },
            )
          )}
        </>
      );
    } else if (modalContext === 'reactions') {
      return (
        <>
          {this.state.currentService.reactions.length <= 0 ? (
            <Text>
              No reactions is available with {this.state.currentService.name}
            </Text>
          ) : (
            this.state.currentService.reactions.map(
              (reaction: object, i: number) => {
                return <Button key={i}>{reaction.name}</Button>;
              },
            )
          )}
        </>
      );
    }
  }

  renderModal() {
    if (this.state.currentService === undefined) return;
    return (
      <Center>
        <Modal
          isOpen={this.state.showModal}
          onClose={() => this.setState({showModal: false})}
          size="full">
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>
              Choose one of {this.state.currentService.name}
            </Modal.Header>
            <ScrollView>
              <Modal.Body>{this.renderList()}</Modal.Body>
            </ScrollView>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  onPress={() => {
                    this.setState({showModal: false});
                  }}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
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
