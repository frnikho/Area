import React, { Component } from 'react';
import { Heading, Box, VStack, FormControl, Input, Link, Button, HStack, Text, Center } from 'native-base';
import axios from "axios";

export default class LoginScreen extends Component {
    constructor(props: any) {
      super(props);
    }

    login = () => {
        axios.get('https://nikho.dev:8080/about.json').then((response) => {
            console.log(response.data);
        })
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
              Welcome to area
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" />
              </FormControl>
              <Button mt="2" colorScheme="indigo" onPress={() => this.login()}>
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm a new user.{" "}
                </Text>
                <Link
                  _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={() => this.props.navigation.navigate('register')}
                >
                  Sign Up
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      );
    }
  };
