import React, {Component} from 'react';
import {
  Heading,
  Box,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Text,
  Center,
  Toast,
  ChevronLeftIcon,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import TokenController from './../../controller/TokenController';
import ServicesAuthentificationsController from '../../controller/ServicesAuthentifications';
export default class CreateServiceAuthentificationScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      service: undefined,
      token_data: undefined,
      title: undefined,
      description: undefined,
    };
    this.onServiceSelected = this.onServiceSelected.bind(this);
    this.onCreateContext = this.onCreateContext.bind(this);
  }

  onServiceSelected(service: object, token_data: object): void {
    this.setState({service: service, token_data: token_data});
    this.props.navigation.goBack();
  }

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
    new ServicesAuthentificationsController().createServiceAuthentification(
      this.state.title,
      this.state.description,
      this.state.token_data,
      this.state.service.type,
      (status, res) => {
        if (status === true) {
          Toast.show({
            title: `You are successfully created a ${this.state.service.name} service.`,
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
