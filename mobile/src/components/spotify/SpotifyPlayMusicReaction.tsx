import TokenController from '../../controller/TokenController';
import app, {config} from '../../axios_config';
import ReactionModal from '../ReactionModal';
import React from 'react';
import {Center, Box, Input} from 'native-base';

export default class SpotifyPlayMusicReaction extends ReactionModal {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceName: 'spotify',
      spotifyUrl: undefined,
    };
  }

  onChangeUrl(newUrl: string) {
    if (this.state.contextValue === undefined) return;
    new TokenController().getUserToken((status, res) => {
      if (status) {
        app
          .get('/me', config(res))
          .then(response => {
            this.setState({spotifyUrl: newUrl});
            this.props.onChangeParam([
              this.state.contextValue,
              response.data.uuid,
              newUrl,
            ]);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }

  renderBody() {
    return (
      <Center>
        <Box w="3/4" maxW="300">
          <Box mt="3" minW="100%">
            <Input
              mt="3"
              placeholder={'Spotify music url'}
              onChangeText={val => this.onChangeUrl(val)}
            />
          </Box>
        </Box>
      </Center>
    );
  }
}
