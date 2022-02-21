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
import app, {config} from '../../axios_config';
import TokenController from './../../controller/TokenController';

export default class CreateServiceAuthentificationScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
        service: undefined,
        token_data: undefined,
        title: undefined,
        description: undefined,
    }
    this.onServiceSelected = this.onServiceSelected.bind(this);
    this.onCreateContext = this.onCreateContext.bind(this);
  }

  onServiceSelected(service: object, token_data: object): void {
      this.setState({service: service, token_data: token_data});
      this.props.navigation.goBack();
  }

  onCreateContext() {
    if (this.state.service === undefined || this.state.token_data === undefined) {
      Toast.show({
        title: "Error with service authentification.",
        status: 'warning',
        description: 'Please try again !',
      });
      return;
    }
    if (this.state.title === undefined) {
      Toast.show({
        title: "Title is required!",
        status: 'warning',
        description: 'Please try again !',
      });
      return;
    }
    const body = {
      "title": this.state.title,
      "description": this.state.description,
      "service": this.state.service.type,
      "token_data": this.state.token_data,
    }
    new TokenController().getUserToken((status, res) => {
      if (status === true) {
        app.post(`context`, body, config(res)).then((response) => {
          Toast.show({
            title: `You are successfully created a ${this.state.service.name} authorization context.`,
            status: 'success',
            description: 'You can now navigate in the dashboard.',
            duration: 2000,
          });
          this.props.navigation.goBack();
        }).catch((error) => {
          console.log(error);
        })
      }
    })
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
                <Input onChangeText={val => this.setState({description: val})} />
              </FormControl>
              <Button mt="2" style={{backgroundColor: this.state.service ? this.state.service.color : "#616161"}} onPress={() => this.props.navigation.navigate('settingsServices', {onSelected: this.onServiceSelected})}>
                {this.state.service ? this.state.service.name : "Choose service"}
              </Button>
              <Button mt="2" colorScheme="indigo" onPress={this.onCreateContext}>
                Create
              </Button>
            </VStack>
          </Box>
        </Center>
      </>
    );
  }
}
