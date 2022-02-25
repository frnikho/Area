import app, {config} from '../../axios_config';
import ActionModal from '../ActionModal';
import TokenController from '../../controller/TokenController';
import React from 'react';
import { Center, Box, Input } from 'native-base';

export default class DiscordGuildMessage extends ActionModal {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceName: 'discord',
      userId: undefined,
    };
  }

  onChangeParam(userId: string) {
    this.setState({userId: userId});
    if (this.state.contextValue) {
      new TokenController().getUserToken((status, res) => {
        if (status) {
          app
            .get(
              `/context?service=Discord&key=${this.state.contextValue}`,
              config(res),
            )
            .then(response => {
              this.props.onChangeParam([
                response.data.tokenData.token.guild.id,
                userId,
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
          <Input
            mt="3"
            placeholder={"Discord user id"}
            onChangeText={val => this.onChangeParam(val)}
          />
        </Box>
      </Center>
    );
  }
}
