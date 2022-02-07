import { Box, Center, Heading, HStack, Stack, Text } from 'native-base';
import React, {Component} from 'react';
import PropTypes from 'prop-types';


class ServiceCard extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Box alignItems="center">
        <Box
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: "#232324",
          }}
          _light={{
            backgroundColor: "",
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
                  {this.props.serviceName}
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
    );
  }
}

ServiceCard.propTypes = {
    serviceName: PropTypes.string.isRequired,
    isAlreadyConnected: PropTypes.bool.isRequired,
}

ServiceCard.defaultProps = {
    isAlreadyConnected: false,
}

export default ServiceCard;