import React, {Component} from 'react';
import {
  Heading,
  Box,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  Toast,
  ChevronLeftIcon,
} from 'native-base';
import ServicesAuthentificationsController from '../../controller/ServicesAuthentifications';
import LoginController from '../../controller/LoginController';

export default class CreateServiceAuthentificationScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      service: undefined,
      token_data: undefined,
      title: undefined,
      description: undefined,
      epitech: false,
      epitechUrl: undefined,
    };
    this.onServiceSelected = this.onServiceSelected.bind(this);
    this.onCreateContext = this.onCreateContext.bind(this);
  }

  /**
   * @description On select a service
   * @param service
   * @param token_data
   */
  onServiceSelected(service: object, token_data: object): void {
    if (service.type === 'epitech_intra' && token_data.epitech === true) {
      this.setState({epitech: true, service: service, token_data: token_data});
    } else {
      this.setState({epitech: false, service: service, token_data: token_data});
    }
    this.props.navigation.goBack();
  }

  onCreateEpitechContext() {
    if (this.state.epitechUrl === undefined) {
      Toast.show({
        title: 'Epitech autologin url is required!',
        status: 'warning',
        description: 'Please try again !',
      });
      return;
    }
    new LoginController().epitechLogin(this.state.epitechUrl, (status, response) => {
      if (status) {
        new ServicesAuthentificationsController().createServiceAuthentification(
          this.state.title,
          this.state.description,
          response.data,
          this.state.service.type,
          (status, res) => {
            if (status === true) {
              Toast.show({
                title: `${this.state.service.name} service authentification is successfully created.`,
                status: 'success',
                description: 'You can now navigate in the dashboard.',
                duration: 2000,
              });
              this.props.navigation.goBack();
            } else {
              console.log(res);
            }
          },
        );
      } else {
        console.log(response);
      }
    })
  }

  /**
   * @description Create new context with parameters
   * @returns
   */
  onCreateContext() {
    if (
      this.state.service === undefined ||
      this.state.token_data === undefined
    ) {
      Toast.show({
        title: 'Error with service authentification.',
        status: 'warning',
        description: 'Please try again !',
      });
      return;
    }
    if (this.state.title === undefined) {
      Toast.show({
        title: 'Title is required!',
        status: 'warning',
        description: 'Please try again !',
      });
      return;
    }
    if (this.state.epitech === true) {
      this.onCreateEpitechContext();
      return;
    }
    new ServicesAuthentificationsController().createServiceAuthentification(
      this.state.title,
      this.state.description,
      this.state.token_data,
      this.state.service.type,
      (status, res) => {
        if (status === true) {
          Toast.show({
            title: `${this.state.service.name} service authentification is successfully created.`,
            status: 'success',
            description: 'You can now navigate in the dashboard.',
            duration: 2000,
          });
          this.props.navigation.goBack();
        } else {
          console.log(res);
        }
      },
    );
  }

  isValid() {
    return this.state.title && this.state.token_data && this.state.service;
  }

  render() {
    return (
      <>
        <ChevronLeftIcon
          id="back"
          size="10"
          mt="0.5"
          //   style={styles.backArrow}
          onPress={() => this.props.navigation.goBack()}
        />
        <Center>
          <Box safeArea w="100%" maxW="300" mt="15%">
            <Heading
              size="lg"
              fontFamily="body"
              fontWeight={600}
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}>
              Create a service authentification
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label isRequired>Title</FormControl.Label>
                <Input onChangeText={val => this.setState({title: val})} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Description</FormControl.Label>
                <Input
                  onChangeText={val => this.setState({description: val})}
                />
              </FormControl>
              {this.state.epitech && (
                <FormControl>
                  <FormControl.Label>Epitech autologin</FormControl.Label>
                  <Input
                    onChangeText={val => this.setState({epitechUrl: val})}
                  />
                </FormControl>
              )}
              <Button
                mt="2"
                style={{
                  backgroundColor: this.state.service
                    ? this.state.service.color
                    : '#616161',
                }}
                onPress={() =>
                  this.props.navigation.navigate('settingsServices', {
                    onSelected: this.onServiceSelected,
                  })
                }>
                {this.state.service
                  ? this.state.service.name
                  : 'Choose service'}
              </Button>
              <Button
                isDisabled={!this.isValid()}
                mt="2"
                colorScheme="indigo"
                onPress={this.onCreateContext}>
                Create
              </Button>
            </VStack>
          </Box>
        </Center>
      </>
    );
  }
}
