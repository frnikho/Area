import React from 'react';
import PropTypes from 'prop-types';
import {Button, Center, Modal, ScrollView, Stack, Text} from 'native-base';
import ChoiceCard from '../components/ChoiceCard';

class ServiceChoicesModal extends React.Component {
  service: object;
  modalContext: string;

  constructor(props: any) {
    super(props);
    this.state = {
      showModal: true,
      currentChoice: undefined,
    };
    this.service = this.props.service;
    this.modalContext = this.props.modalContext;
  }

  componentDidMount() {
    this.setState({showModal: true});
  }

  renderChoiceForm() {
    return (
      <Text>tessst</Text>
    );
  }

  renderList() {
    if (this.modalContext == 'actions') {
      return (
        <>
          <Stack space={2}>
            {this.service.actions.length <= 0 ? (
              <Text>
                No actions is available with {this.service.name}
              </Text>
            ) : (
              this.service.actions.map(
                (action: object, i: number) => {
                  return (
                    <ChoiceCard
                      name={action.name}
                      onPress={() => this.setState({currentChoice: action})}
                      key={i}
                    />
                  );
                },
              )
            )}
          </Stack>
        </>
      );
    } else if (this.modalContext === 'reactions') {
      return (
        <>
          <Stack space={2}>
            {this.service.reactions.length <= 0 ? (
              <Text>
                No reactions is available with {this.service.name}
              </Text>
            ) : (
              this.service.reactions.map(
                (reaction: object, i: number) => {
                  return (
                    <ChoiceCard
                      name={reaction.name}
                      onPress={() => this.setState({currentChoice: reaction})}
                      key={i}
                    />
                  );
                },
              )
            )}
          </Stack>
        </>
      );
    }
  }

  render() {
    return (
      <>
        {this.renderList()}
      </>
    );
  }
}

ServiceChoicesModal.propTypes = {
    service: PropTypes.object,
    modalContext: PropTypes.string,
}

export default ServiceChoicesModal;
