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
