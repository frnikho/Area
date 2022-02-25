import {Button, Center, Modal, ScrollView, Stack, Text} from 'native-base';
import React from 'react';
import ChoiceCard from '../../components/ChoiceCard';
import GithubListRepoAction from '../../components/github/GithubListRepoAction';
import TextInputAction from '../../components/generic_modal/TextInputAction';
import DiscordGuildChannelAction from '../../components/discord/DiscordGuildChannelAction';
import DiscordGuildAction from '../../components/discord/DiscordGuildAction';
import DiscordGuildMessageAction from '../../components/discord/DiscordGuildMessageAction';

export default class ActionsScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      action: undefined,
      parameters: undefined,
    };
    this.onChangeParameters = this.onChangeParameters.bind(this);
  }

  onChangeParameters(parameters: any) {
    this.setState({parameters: parameters});
  }

  onSave() {
    this.props.onSave(this.state.action, this.state.parameters);
  }

  renderModals() {
    const actionsModalList = {
      github: {
        github_repository_push: (
          <GithubListRepoAction
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        github_release_created: (
          <GithubListRepoAction
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        github_issue_opened: (
          <GithubListRepoAction
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        github_issue_closed: (
          <GithubListRepoAction
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        github_issue_reopened: (
          <GithubListRepoAction
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        github_repository_created: (
          <TextInputAction
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
            placeholder="Type github name"
            serviceName='github'
          />
        ),
        github_repository_deleted: (
          <TextInputAction
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
            placeholder="Type github name"
            serviceName='github'
          />
        )
      },
      discord: {
        discord_channel_created: (
          <DiscordGuildChannelAction
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        discord_channel_deleted: (
          <DiscordGuildChannelAction
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        discord_private_message_received: (
          <TextInputAction
            action={this.state.action}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
            placeholder={"Discord user id"}
            serviceName={"discord"}
          />
        ),
        discord_guild_message_updated: (
          <DiscordGuildAction
            action={this.state.action}
            navigation={this.state.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        discord_guild_message_deleted: (
          <DiscordGuildAction
            action={this.state.action}
            navigation={this.state.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        discord_guild_member_banned: (
          <DiscordGuildAction
            action={this.state.action}
            navigation={this.state.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        discord_guild_member_unbanned: (
          <DiscordGuildAction
            action={this.state.action}
            navigation={this.state.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        discord_guild_update: (
          <DiscordGuildAction
            action={this.state.action}
            navigation={this.state.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
        discord_guild_message_received: (
          <DiscordGuildMessageAction
            action={this.state.action}
            navigation={this.state.navigation}
            onChangeParam={this.onChangeParameters}
          />
        )
      }
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
                    });
                  }}
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
            <Modal.Header>
              <Text bold fontFamily="body" fontWeight={400} fontSize="xl">
                Choose one of {this.props.service.name}
              </Text>
            </Modal.Header>
            <ScrollView contentContainerStyle={{padding: 20}}>
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
