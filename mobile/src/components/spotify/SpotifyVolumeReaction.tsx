import TokenController from '../../controller/TokenController';
import app, {config} from '../../axios_config';
import ReactionModal from '../ReactionModal';
import React from 'react';
import {Center, Box, Input, Slider} from 'native-base';

export default class SpotifyVolumeReaction extends ReactionModal {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceName: 'spotify',
      volume: undefined,
    };
  }

  onChangeVolume(volume: number) {
    if (this.state.contextValue === undefined) return;
    new TokenController().getUserToken((status, res) => {
      if (status) {
        app
          .get('/me', config(res))
          .then(response => {
            this.setState({volume: volume});
            this.props.onChangeParam([
              this.state.contextValue,
              response.data.uuid,
              volume,
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
            <Slider
              defaultValue={50}
              minValue={0}
              maxValue={100}
              accessibilityLabel="hello world"
              step={1}
              onChangeEnd={value => {this.onChangeVolume(Math.floor(value))}}
              >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </Box>
        </Box>
      </Center>
    );
  }
}
