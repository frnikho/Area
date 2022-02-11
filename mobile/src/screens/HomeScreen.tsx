
import { Button, IconButton, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import UserApplets from './UserAppletsScreen';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

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
        <IconButton style={styles.profileButton} icon={<IconFontAwesome name="user" size={40} color="black" onPress={() => this.props.navigation.navigate('profile')} />} />
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
  createAppletButton: {
    bottom: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    backgroundColor: "#222222",
    borderRadius: 15,
  },
  profileButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    marginTop: 10,
    marginRight: 10,
  },
  createAppletText: {
    color: "#ffffff",
  },
});