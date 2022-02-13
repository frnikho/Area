import { Button, Center, Modal, ScrollView, Stack, Text } from 'native-base';
import React from 'react';
import ChoiceCard from '../components/ChoiceCard';
import ServicesController from '../controller/ServicesController';
import GithubActionModal from '../components/github/GithubActionModal';

export default class ActionsScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      action: undefined,
      dialog: undefined,
    };

  }

  renderModals() {
    return (
      <GithubActionModal action={this.state.action} />
    );
  }

  renderActionsList() {
    return (
      <>
        <Stack space={2}>
          {this.props.service.actions.length <= 0 ? (
            <Text>No actions is available with {this.props.service.name}</Text>
          ) : (
            this.props.service.actions.map((action: object, i: number) => {
              return (
                <ChoiceCard
                  name={action.name}
                  onPress={() => { this.setState({ action: action, dialog: action.type.toUpperCase() }) }}
                  key={i}
                  style={{marginBottom: 10}}
                />
              );
            })
          )}
        </Stack>
      </>
    );
  }

  render() {
    return (
      <Center>
        <Modal isOpen={true} onClose={this.props.onClose} size="full">
          <Modal.Content maxWidth="375px">
            <Modal.CloseButton />
            <Modal.Header><Text bold fontFamily="body" fontWeight={400} fontSize="xl">Choose one of {this.props.service.name}</Text></Modal.Header>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <Modal.Body>{this.state.dialog === undefined ? this.renderActionsList() : this.renderModals()}</Modal.Body>
            </ScrollView>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button onPress={() => { this.props.onSave(this.state.action) }} isDisabled={this.state.dialog ? false : true} >Save</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  }
}
