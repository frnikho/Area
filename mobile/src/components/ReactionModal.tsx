import {Box, Center, CheckIcon, Icon, Select, Spinner} from 'native-base';
import React from 'react';
import {Button, Text} from 'react-native';
import ServicesAuthentificationsController from '../controller/ServicesAuthentifications';

export default class ReactionModal extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      servicesAuth: undefined,
      contextValue: undefined,
      serviceName: undefined,
    };
    this.renderAuthContext = this.renderAuthContext.bind(this);
  }

  /**
   * @description Load all auth context
   */
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

  /**
   * @description Must be overridden. Save param from reaction
   */
   onChangeParam(param: any) {}

  /**
   * @description Must be overridden if need. Load data to display form.
   */
  loadData(param: any) {}

  /**
   * @description Need to be overridden. Display body of the reaction modal (ex: form submission)
   */
  renderBody() {
    throw new Error('This method must be overridden');
  }

  /**
   * @description on change auth context, store context uuid
   * @param uuid
   */
  onChangeContext(uuid: string) {
    this.setState({contextValue: uuid});
    this.loadData(uuid);
  }

  /**
   * @description render list of auth context
   * @returns
   */
  renderAuthContext() {
    if (this.state.servicesAuth.count <= 0) {
      return (
        <Center>
          <Button
            w="46%"
            colorScheme="indigo"
            onPress={() => this.props.navigation.navigate('servicesAuthentification')}
            leftIcon={<Icon name="settings" size={25} color="white" />}
            style={{
              backgroundColor: '#b03f47',
            }}>
            Register an auth context
          </Button>
        </Center>
      );
    }
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
            onValueChange={itemValue => this.onChangeContext(itemValue)}>
            {this.state.servicesAuth.contexts.map((context, i) => {
              return (
                <Select.Item
                  key={i}
                  label={context.title}
                  value={context.uuid}
                />
              );
            })}
          </Select>
        </Box>
      </Center>
    );
  }

  /**
   * @description Render loading
   * @returns
   */
  renderLoading() {
    return (
      <Center>
        <Spinner accessibilityLabel="Loading posts" size={50} />
      </Center>
    );
  }

  /**
   * @description Render
   * @returns
   */
  render() {
    return (
      <Center>
        <Text>
          {this.props.reaction.description === undefined ||
          this.props.reaction.description.length === 0
            ? 'No description is available for the moment'
            : this.props.reaction.description}
        </Text>
        {this.state.servicesAuth === undefined
          ? this.renderLoading()
          : this.renderAuthContext()}
        {this.renderBody()}
      </Center>
    );
  }
}
