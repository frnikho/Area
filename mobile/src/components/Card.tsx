import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import React, {Component} from 'react';

export default class Card extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity>
        <Box alignItems="center">
          <Box
            maxW="80"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: this.props.backgroundColor,
            }}
            _light={{
              backgroundColor: this.props.backgroundColor,
            }}>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Center>
                  <Heading
                    size="md"
                    ml="-1"
                    _light={{
                      color: 'white',
                    }}
                    _dark={{
                      color: 'white',
                    }}>
                    {this.props.title}
                  </Heading>
                  <Text
                    fontSize="xs"
                    _light={{
                      color: 'white',
                    }}
                    _dark={{
                      color: 'white',
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1">
                    {this.props.description}
                  </Text>
                </Center>
              </Stack>
              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between">
                <HStack alignItems="center">
                  <Text
                    color="coolGray.600"
                    _light={{
                      color: 'white',
                    }}
                    _dark={{
                      color: 'white',
                    }}
                    fontWeight="400">
                    Created 6 mins ago
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  }
}
