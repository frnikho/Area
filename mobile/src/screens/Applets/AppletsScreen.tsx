import React, { Component } from 'react';
import {
  Box,
  Button,
  Center,
  ChevronLeftIcon,
  FormControl,
  Input,
  Text,
  Toast,
  VStack,
} from 'native-base';
import { StyleSheet, View } from 'react-native';
import AppletsController from '../../controller/AppletsController';
import error from '../../error';

export default class AppletsScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      action: undefined,
      reaction: undefined,
      actionParameters: undefined,
      reactionParameters: undefined,
      appletTitle: undefined,
    };
    this.onActionSelected = this.onActionSelected.bind(this);
    this.onReactionSelected = this.onReactionSelected.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  isValid() {
    return (
      this.state.action &&
      this.state.reaction &&
      this.state.actionParameters &&
      this.state.reactionParameters &&
      this.state.appletTitle
    );
  }

  onActionSelected(action: object, param: object) {
    this.setState({ action: action, actionParameters: param });
    this.props.navigation.goBack();
  }

  onReactionSelected(reaction: object, param: object) {
    this.setState({ reaction: reaction, reactionParameters: param });
    this.props.navigation.goBack();
  }

  actionButtonRender() {
    if (this.state.action === undefined) {
      return (
        <View id="action">
          <Button
            mode="contained"
            style={styles.actionButton}
            onPress={() =>
              this.props.navigation.navigate('services', {
                modalContext: 'actions',
                onSelected: this.onActionSelected,
              })
            }>
            <Text
              fontFamily="body"
              fontWeight={600}
              fontSize="3xl"
              style={styles.actionText}>
              If this
            </Text>
          </Button>
        </View>
      );
    } else {
      return (
        <View id="action">
          <Button
            mode="contained"
            style={{ marginTop: 50, marginLeft: 30, marginRight: 30, justifyContent: 'center', backgroundColor: this.state.action.serviceColor, borderRadius: 15 }}
            onPress={() =>
              this.props.navigation.navigate('services', {
                modalContext: 'actions',
                onSelected: this.onActionSelected,
              })
            }>
            <Text
              fontFamily="body"
              fontWeight={600}
              fontSize="3xl"
              style={styles.actionText}>
              If {this.state.action.action.name}
            </Text>
          </Button>
        </View>
      );
    }
  }

  reactionButtonRender() {
    if (this.state.reaction === undefined) {
      return (
        <View id="reaction">
          <Button
            mode="contained"
            style={styles.reactionButton}
            onPress={() =>
              this.props.navigation.navigate('services', {
                modalContext: 'reactions',
                onSelected: this.onReactionSelected,
              })
            }>
            <Text
              fontFamily="body"
              fontWeight={600}
              fontSize="3xl"
              style={styles.reactionText}>
              Then that
            </Text>
          </Button>
        </View>
      );
    } else {
      return (
        <View id="reaction">
          <Button
            mode="contained"
            style={{ marginTop: 50, marginLeft: 30, marginRight: 30, justifyContent: 'center', backgroundColor: this.state.reaction.serviceColor, borderRadius: 15 }}
            onPress={() =>
              this.props.navigation.navigate('services', {
                modalContext: 'reactions',
                onSelected: this.onReactionSelected,
              })
            }>
            <Text
              fontFamily="body"
              fontWeight={600}
              fontSize="3xl"
              style={styles.reactionText}>
              Then that {this.state.reaction.reaction.name}
            </Text>
          </Button>
        </View>
      );
    }
  }

  mainTextRender() {
    return (
      <VStack id="mainText" alignItems="center" style={styles.mainText}>
        <Text fontFamily="body" fontWeight={400} fontSize="3xl">
          Create your own
        </Text>
      </VStack>
    );
  }

  onCreate() {
    new AppletsController().createUserApplet(
      this.state.serviceTitle,
      this.state.action,
      this.state.reaction,
      this.state.actionParameters,
      this.state.reactionParameters,
      (status, res) => {
        if (status) {
          Toast.show({
            title: this.state.serviceTitle + ' applet is successfully created',
            status: 'success',
            description: 'You can now navigate in the dashboard.',
            duration: 2000,
          });
          this.props.navigation.navigate('home');
        } else {
          console.log(res.response.data);
        }
      },
    );
  }

  /**
   * Create applet Button Render
   *
   */
  createButtonRender() {
    return (
      <View id="createApplet" style={styles.createContainer}>
        <Button isDisabled={!this.isValid()} mode="contained" style={styles.createButton} onPress={this.onCreate}>
          <Text fontFamily="body" fontWeight={600} fontSize="3xl" style={styles.createText}>Create</Text>
        </Button>
      </View>
    );
  }

  /**
   * Applet title form render
   *
   * @returns
   */
  appletTitleFormRender() {
    return (
      <Center>
        <Box safeArea w="100%" maxW="325">
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label isRequired> <Text fontFamily="body" fontWeight={600} fontSize="3xl" style={styles.titleFormText}>Title</Text></FormControl.Label>
              <Input size="xl" onChangeText={value => this.setState({ appletTitle: value })} />
            </FormControl>
          </VStack>
        </Box>
      </Center>
    );
  }

  render() {
    return (
      <View id="appletsMainView" style={styles.appletsMainView}>
        <ChevronLeftIcon
          id="back"
          size="10"
          mt="0.5"
          style={styles.backArrow}
          onPress={() => this.props.navigation.goBack()}
        />
        {this.mainTextRender()}
        {this.appletTitleFormRender()}
        {this.actionButtonRender()}
        {this.reactionButtonRender()}
        {this.createButtonRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appletsMainView: {
    flex: 1,
  },
  backArrow: {
    marginTop: 5,
    marginBottom: 0,
  },
  mainText: {
    marginTop: 0,
  },
  actionButton: {
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center',
    backgroundColor: '#222222',
    borderRadius: 15,
  },
  actionText: {
    color: '#ffffff',
  },
  reactionButton: {
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center',
    backgroundColor: '#999999',
    borderRadius: 15,
  },
  reactionText: {
    color: '#ffffff',
  },
  createButton: {
    bottom: 10,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center',
    backgroundColor: "#222222",
    borderRadius: 15,
  },
  createText: {
    color: '#ffffff',
  },
  createContainer: {
    width: '100%',
    marginTop: 50,
  },
  titleFormText: {
    color: '#222222',
  },
});
