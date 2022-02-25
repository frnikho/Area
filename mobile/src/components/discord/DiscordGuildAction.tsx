import React from 'react';
import app, {config} from '../../axios_config';
import ActionModal from '../ActionModal';
import TokenController from '../../controller/TokenController';
import {Center, Text} from 'native-base';

export default class DiscordGuildAction extends ActionModal {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceName: 'discord',
    };
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.state.contextValue === undefined)
        return;
    if (this.state.contextValue !== prevState.contextValue) {
      console.log(this.state.contextValue, prevState.contextValue)
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
              ]);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    }
  }

  renderBody() {}
}
