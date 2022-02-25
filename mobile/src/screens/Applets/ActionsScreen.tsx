import { Button, Center, Modal, ScrollView, Stack, Text } from 'native-base';
import React from 'react';
import ChoiceCard from '../../components/ChoiceCard';
import GithubListRepoActionModal from '../../components/github/GithubListRepoActionModal';

export default class ActionsScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      action: undefined,
      parameters: undefined,
      serviceColor: undefined,
    };
    this.onChangeParameters = this.onChangeParameters.bind(this);
  }

  onChangeParameters(parameters: any) {
    this.setState({ parameters: parameters });
  }

  onSave() {
    this.props.onSave({ action: this.state.action, serviceColor: this.state.serviceColor }, this.state.parameters);
  }

  renderModals() {
    const actionsModalList = {
      github: {
        github_repository_push: (
          <GithubListRepoActionModal
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        github_release_created: (
          <GithubListRepoActionModal
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        github_issue_opened: (
          <GithubListRepoActionModal
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        github_issue_closed: (
          <GithubListRepoActionModal
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        github_issue_reopened: (
          <GithubListRepoActionModal
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
      },
    };
    return actionsModalList[this.props.service.type][this.state.action.type];
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
                  onPress={() => {
                    this.setState({
                      action: action,
                      serviceColor: this.props.service.color
                    });
                  }}
                  key={i}
                  style={{ marginBottom: 10 }}
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
            <Modal.Header>
              <Text bold fontFamily="body" fontWeight={400} fontSize="xl">
                Choose one of {this.props.service.name}
              </Text>
            </Modal.Header>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <Modal.Body>
                {this.state.action === undefined
                  ? this.renderActionsList()
                  : this.renderModals()}
              </Modal.Body>
            </ScrollView>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  onPress={() => {
                    this.onSave();
                  }}
                  isDisabled={this.state.action && this.state.parameters ? false : true}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  }
}
