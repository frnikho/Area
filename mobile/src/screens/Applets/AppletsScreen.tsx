import React, {Component} from 'react';
import {
  Box,
  Button,
  Center,
  ChevronLeftIcon,
  Text,
  Toast,
  VStack,
} from 'native-base';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppletsController from '../../controller/AppletsControler';

export default class AppletsScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      action: undefined,
      reaction: undefined,
      actionParameters: undefined,
      reactionParameters: undefined,
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
      this.state.reactionParameters
    );
  }

  onActionSelected(action: object, param: object) {
    this.setState({action: action, actionParameters: param});
    this.props.navigation.goBack();
  }

  onReactionSelected(reaction: object, param: object) {
    this.setState({reaction: reaction, reactionParameters: param});
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
              fontSize="4xl"
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
              fontSize="4xl"
              style={styles.actionText}>
              {this.state.action.name}
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
              fontSize="4xl"
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
              fontSize="4xl"
              style={styles.reactionText}>
              {this.state.reaction.name}
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
      'test justin',
      this.state.action,
      this.state.reaction,
      this.state.actionParameters,
      this.state.reactionParameters,
      (status, res) => {
        if (status) {
          Toast.show({
            title: 'You are successfully created a',
            status: 'success',
            description: 'You can now navigate in the dashboard.',
            duration: 2000,
          });
          this.props.navigation.navigate('home');
        }
      },
    );
  }

  renderFooter() {
    return (
      <View style={styles.createContainer}>
        <Button
          isDisabled={!this.isValid()}
          mode="contained"
          style={styles.createButton}
          onPress={this.onCreate}>
          <Text
            fontFamily="body"
            fontWeight={600}
            fontSize="4xl"
            style={styles.createText}>
            Create
          </Text>
        </Button>
      </View>
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
        {this.actionButtonRender()}
        {this.reactionButtonRender()}
        {this.renderFooter()}
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
  },
  reactionText: {
    color: '#ffffff',
  },
  createButton: {
    justifyContent: 'center',
    backgroundColor: '#222222',
    marginLeft: 10,
    marginRight: 10,
  },
  createText: {
    color: '#ffffff',
  },
  createContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 10,
  },
});
