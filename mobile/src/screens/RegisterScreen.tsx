import React, { Component } from 'react';
import { Heading, Box, VStack, FormControl, Input, Link, Button, HStack, Text, Center } from 'native-base';

export default class RegisterScreen extends Component {
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
                <Input />
              </FormControl>
              <FormControl>
                <FormControl.Label>Last name</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" />
              </FormControl>
              <FormControl>
                <FormControl.Label>Retype password</FormControl.Label>
                <Input type="password" />
              </FormControl>
              <Button mt="2" colorScheme="indigo">
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