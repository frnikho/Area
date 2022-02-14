import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from 'native-base';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class ServiceCard extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Box alignItems="center">
          <Box
            width="100%"
            height="120"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: this.props.backgroundColor ?? '#4287f5',
            }}
            _light={{
              backgroundColor: this.props.backgroundColor ?? '#4287f5',
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
                    {this.props.name ?? "Unknown"}
                  </Heading>
                </Center>
              </Stack>
              <Stack
                alignItems="center"
                space={4}
                justifyContent="space-between">
                <HStack alignItems="center">
                  <Center>
                    <Icon name="logo-google" size={25} color="white" />
                  </Center>
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  }
}

ServiceCard.propTypes = {
  backgroundColor: PropTypes.string,
  name: PropTypes.string,
  logo: PropTypes.string,
  onPress: PropTypes.func,
}

export default ServiceCard;
