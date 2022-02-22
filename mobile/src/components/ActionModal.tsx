import {Box, Center, CheckIcon, Select, Spinner} from 'native-base';
import React from 'react';
import {Text} from 'react-native';
import ServicesAuthentificationsController from '../controller/ServicesAuthentifications';

export default class ActionModal extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      servicesAuth: undefined,
      contextValue: undefined,
      serviceName: undefined,
    };
    this.renderAuthContext = this.renderAuthContext.bind(this);
  }

  componentDidMount() {
    new ServicesAuthentificationsController().getAllUserServicesAuthentifications(
      (status, response) => {
        if (status) {
          response.map((service: object) => {
            if (service.service === this.state.serviceName) {
              this.setState({servicesAuth: service});
            }
          });
        }
      },
    );
  }

  loadData(param: any) {
  }

  renderLoading() {
    return (
      <Center>
        <Spinner accessibilityLabel="Loading posts" size={50} />
      </Center>
    );
  }

  onChangeContext(uuid: string) {
    this.setState({contextValue: uuid});
    this.loadData(uuid);
  }

  renderAuthContext() {
    return (
      <Center>
        <Box w="3/4" maxW="300">
          <Select
            selectedValue={this.state.contextValue}
            minWidth="200"
            accessibilityLabel="Choose an auth context"
            placeholder="Choose an auth context"
            _selectedItem={{
              bg: 'primary.200',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue =>
              this.onChangeContext(itemValue)
            }>
            {this.state.servicesAuth.contexts.map((context, i) => {
              return <Select.Item key={i} label={context.title} value={context.uuid} />;
            })}
          </Select>
        </Box>
      </Center>
    );
  }

  renderBody() {
    throw new Error('This method must be overridden');
  }

  render() {
    return (
      <Center>
        <Text>
          {this.props.action.description === undefined ||
          this.props.action.description.length === 0
            ? 'No description is available for the moment'
            : this.props.action.description}
        </Text>
        {this.state.servicesAuth === undefined
          ? this.renderLoading()
          : this.renderAuthContext()}
        {this.renderBody()}
      </Center>
    );
  }
}
