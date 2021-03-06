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
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginController from '../../controller/LoginController';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class LoginScreen extends Component {
  state: {
    email: string | undefined;
    password: string | undefined;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
    };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    if (this.state.email === undefined || this.state.password === undefined) {
      Toast.show({
        title: "Email and password are required",
        status: 'warning',
        description: 'Please try again !',
      });
    }
    new LoginController().nativeLogin(
      this.state.email,
      this.state.password,
      async (status, res) => {
        if (status) {
          await AsyncStorage.setItem('@token', res.data.token);
          Toast.show({
            title: 'You are successfully authenticated',
            status: 'success',
            description: 'You can now navigate in the dashboard.',
            duration: 2000,
          });
          setTimeout(() => {
            this.props.navigation.navigate('home');
          }, 1000);
        } else {
          console.log(res);
          Toast.show({
            title: res.response.data.error,
            status: 'warning',
            description: 'Please try again !',
          });
        }
      },
    );
  }

  onLoginGoogle() {
    console.log('test');
    new LoginController().googleLogin((status, res) => {
      if (status) {
        console.log(res);
      } else {
        console.log(res);
      }
    });
  }

  onLoginGithub() {
    new LoginController().githubLogin((status, res) => {
      if (status) {
        console.log(res);
      } else {
        console.log(res);
      }
    });
  }

  render() {
    return (
      <Center>
        <Box safeArea p="2" py="8" w="90%" maxW="290" mt="24%">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}>
            AREA
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs">
            Welcome to area
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input onChangeText={val => this.setState({email: val})} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={val => this.setState({password: val})}
              />
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={this.onLogin}>
              Sign in
            </Button>
            <HStack justifyContent="center" alignItems="center" space={5}>
              <Button
                w="46%"
                onPress={this.onLoginGithub}
                leftIcon={<Icon name="logo-github" size={25} color="white" />}
                style={{
                  backgroundColor: '#111833',
                }}>
                Github
              </Button>
              <Button
                w="46%"
                colorScheme="indigo"
                onPress={this.onLoginGoogle}
                leftIcon={<Icon name="logo-google" size={25} color="white" />}
                style={{
                  backgroundColor: '#b03f47',
                }}>
                Google
              </Button>
            </HStack>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                I'm a new user.{' '}
              </Text>
              <Link
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                onPress={() => this.props.navigation.navigate('register')}>
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    );
  }
}
