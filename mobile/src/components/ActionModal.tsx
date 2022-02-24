import { Box, Button, Center, CheckIcon, Select, Spinner } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import ServicesAuthentificationsController from '../controller/ServicesAuthentifications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loading from './Loading';


export default class ActionModal extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      servicesAuth: undefined,
      contextValue: undefined,
      serviceName: undefined,
    };
    this.renderAuthContext = this.renderAuthContext.bind(this);
    this.getServicesAuth = this.getServicesAuth.bind(this);
  }

  componentDidMount() {
    this.getServicesAuth();
  }

  /**
   * Get services auth of user by service name
   */
  getServicesAuth() {
    new ServicesAuthentificationsController().getServicesAuthByService(this.state.serviceName, (status, response) => {
      if (status)
        this.setState({ servicesAuth: response });
    });
  }

  /**
   * @description Must be overridden. Save param from action
   */
  onChangeParam(param: any) { }

  /**
   * @description Must be overridden if need. Load data to display form.
   */
  loadData() { }

  /**
   * @description on change auth context, store context uuid
   * @param uuid
   */
  onChangeContext(uuid: string) {
    this.setState({ contextValue: uuid });
    this.loadData();
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
   * @description Need to be overridden. Display body of the action modal (ex: form submission)
   */
  renderBody() {
    throw new Error('This method must be overridden');
  }

  /**
   * @description Render
   * @returns
   */
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
          ? <Loading />
          : this.renderAuthContext()}
        {this.renderBody()}
      </Center>
    );
  }
}
