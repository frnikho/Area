import {Button, Center, Modal, ScrollView, Stack, Text} from 'native-base';
import React from 'react';
import ChoiceCard from '../../components/ChoiceCard';
import DiscordPostMessageReaction from '../../components/discord/DiscordPostMessageReaction';
import SpotifyPauseMusicReaction from '../../components/spotify/SpotifyPauseMusicReaction';

export default class ReactionsScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      reaction: undefined,
      parameters: undefined,
    };
    this.onChangeParameters = this.onChangeParameters.bind(this);
  }

  onChangeParameters(parameters: any) {
    this.setState({parameters: parameters});
  }

  onSave() {
    this.props.onSave(this.state.reaction, this.state.parameters);
  }

  renderModals() {
    const reactionsModalList = {
      discord: {
        discord_send_chanel_message: (
          <DiscordPostMessageReaction
            reaction={this.state.reaction}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        ),
      },
      spotify: {
        spotify_pause_track: (
          <SpotifyPauseMusicReaction
            reaction={this.state.reaction}
            navigation={this.props.navigation}
            onChangeParam={this.onChangeParameters}
          />
        )
      }
    };
    return reactionsModalList[this.props.service.type][
      this.state.reaction.type
    ];
  }

  renderReactionsList() {
    return (
      <>
        <Stack space={2}>
          {this.props.service.reactions && this.props.service.reactions.length <= 0 ? (
            <Text>
              No reactions is available with {this.props.service.name}
            </Text>
          ) : (
            this.props.service.reactions.map((reaction: object, i: number) => {
              return (
                <ChoiceCard
                  name={reaction.name}
                  onPress={() => this.setState({reaction: reaction})}
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
            <Modal.Header>
              <Text bold fontFamily="body" fontWeight={400} fontSize="xl">
                Choose one of {this.props.service.name}
              </Text>
            </Modal.Header>
            <ScrollView contentContainerStyle={{padding: 20}}>
              <Modal.Body>
                {this.state.reaction === undefined
                  ? this.renderReactionsList()
                  : this.renderModals()}
              </Modal.Body>
            </ScrollView>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  onPress={() => {
                    this.onSave();
                  }}
                  isDisabled={this.state.reaction && this.state.parameters ? false : true}>
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
