import app, {config} from '../../axios_config';
import ActionModal from '../ActionModal';
import TokenController from '../../controller/TokenController';
import React from 'react';
import { Center, Box, Text } from 'native-base';

export default class DiscordGuildAction extends ActionModal {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceName: 'discord',
      discordName: undefined,
    };
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.state.contextValue === undefined) return;
    if (this.state.contextValue !== prevState.contextValue) {
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
              ]);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    }
  }

  renderBody() {
    return (
      <Center>
        <Box w="3/4" maxW="300">
          <Box mt="3">
            {this.state.discordName && (
                <Text mt='3'>Discord: {this.state.discordName}</Text>
            )}
          </Box>
        </Box>
      </Center>
    );
  }
}
