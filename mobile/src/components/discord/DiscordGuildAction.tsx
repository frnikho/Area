import {Box, Center, CheckIcon, Input, Select, Text} from 'native-base';
import React from 'react';
import app, {config} from '../../axios_config';
import ActionModal from '../ActionModal';
import TokenController from '../../controller/TokenController';

export default class DiscordGuildAction extends ActionModal {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceName: 'discord',
      type: undefined,
      discordName: undefined,
    };
    this.onChangeParam = this.onChangeParam.bind(this);
  }

  onChangeParam(type: string) {
    this.setState({type: type});
    if (this.state.contextValue) {
      new TokenController().getUserToken((status, res) => {
        if (status) {
          app
            .get(
              `/context?service=Discord&key=${this.state.contextValue}`,
              config(res),
            )
            .then(response => {
              this.setState({
                discordName: response.data.tokenData.token.guild.name,
              });
              this.props.onChangeParam([
                response.data.tokenData.token.guild.id,
                type,
              ]);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    }
  }

  renderList() {
    return (
      <Center>
        {this.state.discordName && (
            <Text>Discord: {this.state.discordName}</Text>
        )}
        <Box w="3/4" maxW="300">
          <Box mt="3">
            <Select
              selectedValue={this.state.type}
              minWidth="200"
              accessibilityLabel="Choose a channel type"
              placeholder="Choose a channel type"
              _selectedItem={{
                bg: 'primary.200',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => this.onChangeParam(itemValue)}>
              <Select.Item label={'Vocal'} value={'GUILD_VOICE'} />
              <Select.Item label={'Text'} value={'GUILD_TEXT'} />
            </Select>
          </Box>
        </Box>
      </Center>
    );
  }

  renderBody() {
    return this.renderList();
  }
}
