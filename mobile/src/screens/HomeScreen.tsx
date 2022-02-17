
import { Button, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import UserApplets from './Applets/UserAppletsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HomeScreen extends Component {

  constructor(props: any) {
    super(props);
  }

  /**
   * Create Applet Button Render
   *
   */
  createAppletButtonRender() {
    return (
      <View id="createApplet" >
        <Button mode="contained" style={styles.createAppletButton} onPress={() => this.props.navigation.navigate('applets')}>
          <Text fontFamily="body" fontWeight={600} fontSize="2xl" style={styles.createAppletText}>Create</Text>
        </Button>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Button
          onPress={() => this.props.navigation.navigate('settings')}
          leftIcon={<Icon name="settings" size={40} color="black" />}
          style={styles.settingsButton} />
        <UserApplets />
        {this.createAppletButtonRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  settingsButton: {
    backgroundColor: 'transparent',
    marginTop: 10,
    marginRight: 10,
    marginBottom: -20,
    alignSelf: 'flex-end',
  },
  createAppletButton: {
    bottom: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    backgroundColor: "#222222",
    borderRadius: 15,
  },
  createAppletText: {
    color: "#ffffff",
  },
});