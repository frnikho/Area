import { Button, Center, Modal, ScrollView, Stack, Text } from 'native-base';
import React from 'react';
import ChoiceCard from '../../components/ChoiceCard';
import GithubActionModal from '../../components/github/GithubActionModal';

export default class ReactionsScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      reaction: undefined,
    };
  }

  renderModals() {
    return (
      <GithubActionModal action={this.state.reaction} />
    );
  }

  renderReactionsList() {
    return (
      <>
        <Stack space={2}>
          {this.props.service.reactions.length <= 0 ? (
            <Text>No reactions is available with {this.props.service.name}</Text>
          ) : (
            this.props.service.reactions.map((reaction: object, i: number) => {
              return (
                <ChoiceCard
                  name={reaction.name}
                  onPress={() => this.setState({ reaction: reaction })}
                  key={i}
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
              <Modal.Body>{this.state.reaction === undefined ? this.renderReactionsList() : this.renderModals()}</Modal.Body>
            </ScrollView>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button onPress={() => { this.props.onSave(this.state.reaction) }} isDisabled={this.state.reaction ? false : true} >Save</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  }
}
