import React from 'react';
import ReactionModal from '../ReactionModal';
import TokenController from '../../controller/TokenController';
import app, {config} from '../../axios_config';
import {Center, Box, Select, CheckIcon} from 'native-base';

export default class DiscordPostMessageReaction extends ReactionModal {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceName: 'discord',
      channels: undefined,
      channel: undefined,
    };
  }

  loadData() {
    new TokenController().getUserToken((status, response) => {
      if (status) {
        app
          .get(
            `services/discord/list?context=${this.state.contextValue}&service=discord`,
            config(response),
          )
          .then(response => {
            console.log(response.data);
            this.setState({
              channels: response.data,
            });
          })
          .catch(err => console.log(err.response));
      }
    });
  }

  renderListChannels() {
    return (
      <Center>
        <Box w="3/4" maxW="300">
          <Select
            selectedValue={this.state.channel}
            minWidth="200"
            accessibilityLabel="Choose a channel"
            placeholder="Choose a channel"
            _selectedItem={{
              bg: 'primary.200',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue => this.setState({channel: itemValue})}>
            {this.state.channels.map((channel, i) => {
              return (
                <Select.Item key={i} label={channel.name} value={channel.id} isDisabled={channel.type !== 0} />
              );
            })}
          </Select>
        </Box>
      </Center>
    );
  }

  renderBody() {
    return this.state.channels === undefined ? (
      <></>
    ) : (
      this.renderListChannels()
    );
  }
}
