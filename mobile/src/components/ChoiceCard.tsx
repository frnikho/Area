import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Box, Center, Heading, Stack} from 'native-base';

class ChoiceCard extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{justifyContent: 'center'}}>
          <Box alignItems="center">
            <Box
              width="100%"
              height="100"
              rounded="xl"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: 'coolGray.600',
                backgroundColor: this.props.backgroundColor ?? '#4287f5',
              }}
              _light={{
                backgroundColor: '#4287f5',
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
                      {this.props.name ?? 'Unknown'}
                    </Heading>
                  </Center>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </View>
      </TouchableOpacity>
    );
  }
}

ChoiceCard.propTypes = {
  backgroundColor: PropTypes.string,
  name: PropTypes.string,
  onPress: PropTypes.func,
};

export default ChoiceCard;
