import React from 'react';
import ReactionModal from '../ReactionModal';
import TokenController from '../../controller/TokenController';
import app, {config} from '../../axios_config';
import {Center, Box, Select, CheckIcon, FormControl, Input} from 'native-base';

export default class DiscordPostMessageReaction extends ReactionModal {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceName: 'discord',
      channels: undefined,
      channel: undefined,
      text: undefined,
    };
    this.onChangeParam = this.onChangeParam.bind(this);
  }

  /**
   * @description Load all discord channel
   */
  loadData() {
    new TokenController().getUserToken((status, response) => {
      if (status) {
        app
          .get(
            `services/discord/list?context=${this.state.contextValue}&service=discord`,
            config(response),
          )
          .then(response => {
            this.setState({
              channels: response.data,
            });
          })
          .catch(err => console.log(err.response));
      }
    });
  }

  /**
   * @description Set channel and send it to main screen
   * @param repository
   */
  onChangeParam(text: string) {
    this.props.onChangeParam([this.state.channel, text]);
  }

  onChangeChannel(channel: any) {
    this.setState({channel: channel});
    if (this.state.channel && this.state.text) {
      this.onChangeParam(this.state.text);
    }
  }

  onChangeText(text: any) {
    this.setState({text: text});
    if (this.state.channel && this.state.text) {
      this.onChangeParam(text);
    }
  }

  /**
   * @description Render list of channel
   * @returns
   */
  renderListChannels() {
    return (
      <Center>
        <Box w="3/4" maxW="300">
          <Box mt='3'>
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
              onValueChange={itemValue => this.onChangeChannel(itemValue)}>
              {this.state.channels.map((channel, i) => {
                return (
                  <Select.Item
                    key={i}
                    label={channel.name}
                    value={channel.id}
                    isDisabled={channel.type !== 0}
                  />
                );
              })}
            </Select>
          </Box>
          <Input
            mt="3"
            placeholder="Type your text"
            onChangeText={val => this.onChangeText(val)}
          />
        </Box>
      </Center>
    );
  }

  renderTextInput() {
    return (
      <FormControl w="100%">
        <FormControl.Label>Text</FormControl.Label>
        <Input onChangeText={val => this.onChangeText(val)} />
      </FormControl>
    );
  }

  /**
   * @description render body
   * @returns
   */
  renderBody() {
    return this.state.channels === undefined ? (
      <></>
    ) : (
      this.renderListChannels()
    );
  }
}
