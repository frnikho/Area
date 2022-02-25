import {Box, Center, Input} from 'native-base';
import React from 'react';
import ActionModal from '../ActionModal';

export default class TextInputAction extends ActionModal {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceName: this.props.serviceName,
      text: undefined,
    };
    this.onChangeParam = this.onChangeParam.bind(this);
  }

  loadData() {}

  onChangeParam(text: string) {
    this.props.onChangeParam([text]), this.setState({text: text});
  }

  renderBody() {
    return (
      <Center>
        <Box w="3/4" maxW="300">
          <Input
            mt="3"
            placeholder={this.props.placeholder}
            onChangeText={val => this.onChangeParam(val)}
          />
        </Box>
      </Center>
    );
  }
}
