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

export default class CreateServiceAuthentificationScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
        service: undefined,
    }
    this.onServiceSelected = this.onServiceSelected.bind(this)
  }

  onServiceSelected(service: object): void {
      this.setState({service: service});
      this.props.navigation.goBack();
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
                <Input onChangeText={val => this.setState({email: val})} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Description</FormControl.Label>
                <Input onChangeText={val => this.setState({password: val})} />
              </FormControl>
              <Button mt="2" style={{backgroundColor: this.state.service ? this.state.service.color : "#616161"}} onPress={() => this.props.navigation.navigate('settingsServices', {onSelected: this.onServiceSelected})}>
                {this.state.service ? this.state.service.name : "Choose service"}
              </Button>
              <Button mt="2" colorScheme="indigo" /*onPress={this.onLogin}*/>
                Create
              </Button>
            </VStack>
          </Box>
        </Center>
      </>
    );
  }
}
