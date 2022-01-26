import React, { Component } from 'react';
import { Heading, Box, VStack, FormControl, Input, Link, Button, HStack, Text, Center, Toast } from 'native-base';
import app from '../axios_config';
import { BACKEND_URL } from "@env"
export default class RegisterScreen extends Component {

    state: {
      firstName: String | undefined,
      lastName: String | undefined,
      email: String | undefined,
      password: String | undefined,
      rePassword: String | undefined
    };

    constructor(props: any) {
      super(props);
      this.state = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        rePassword: undefined,
      };
      this.onRegister = this.onRegister.bind(this);
    }

    onRegister() {
      if (this.state.firstName === undefined || this.state.lastName === undefined || this.state.email === undefined || this.state.password === undefined || this.state.rePassword === undefined) {
        return;
      }
      if (this.state.password !== this.state.rePassword) {
        Toast.show({
          title: "Password does not match",
          status: "warning",
          description: "Please try again !",
        })
        return;
      }

      app.post(`${BACKEND_URL}/auth/register`, {
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstName,
        lastname: this.state.lastName,
      }).then((response: any) => {
        if (response.status === 200) {
          Toast.show({
            title: "Account succesfuly created",
            status: "success",
            description: "You can now login with your new account.",
            duration: 3000
          });
          setTimeout(() => {
            this.props.navigation.navigate('login')
          }, 3000);
        } else {
        }
      }).catch((err: any) => {
        console.log(err);
        Toast.show({
          title: err.response.data.error,
          status: "warning",
          description: "Please try again !",
        })
      })
    }

    render() {
      return (
        <Center>
          <Box safeArea p="2" py="8" w="90%" maxW="290" mt="10%">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              AREA
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Register to AREA
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>First name</FormControl.Label>
                <Input onChangeText={(val) => this.setState({firstName: val})} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Last name</FormControl.Label>
                <Input onChangeText={(val) => this.setState({lastName: val})} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input onChangeText={(val) => this.setState({email: val})} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" onChangeText={(val) => this.setState({password: val})}/>
              </FormControl>
              <FormControl>
                <FormControl.Label>Retype password</FormControl.Label>
                <Input type="password" onChangeText={(val) => this.setState({rePassword: val})} />
              </FormControl>
              <Button mt="2" colorScheme="indigo" onPress={this.onRegister}>
                Register
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Already have an account.{" "}
                </Text>
                <Link
                  _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={() => this.props.navigation.navigate('login')}
                >
                  Login
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      );
    }
  };