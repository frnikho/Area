import { Button, Text, ScrollView } from 'native-base';
import React, { Component } from 'react';
import Card from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, View } from 'react-native';
import { Subheading } from 'react-native-paper';

export default class HomeScreen extends Component {
  constructor(props: any) {
    super(props);
    // this.onDisconnect = this.onDisconnect.bind(this);
  }

  // onDisconnect() {
  //   AsyncStorage.removeItem('@token').then(() => {
  //     Toast.show({
  //       title: 'You are successfully disconnected',
  //       status: 'success',
  //       description: 'You can now login.',
  //       duration: 2000,
  //     });
  //     this.props.navigation.navigate('login');
  //   });
  // }

  createAppletButtonRender() {
    return (
      <View id="createApplet" >
          <Button mode="contained" style={styles.createAppletButton} onPress={() => this.props.navigation.navigate('applets')}>
            <Text style={styles.createAppletText}>Create</Text>
          </Button>
      </View>
    );
  }

  myAppletsRender() {
    return (
      <ScrollView contentContainerStyle={{padding: 20}}>
          <Subheading>My applets</Subheading>
          <View id="myApplets" style={styles.myApplets}>
            <Card
              title="Youtube"
              description="blablabla description"
              backgroundColor="#ff4545"
              />
          </View>
        </ScrollView>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.myAppletsRender()}
        {this.createAppletButtonRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#DCDCDC",
  },
  createAppletButton: {
        bottom: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        backgroundColor: "#222222",
  },
  createAppletText: {
    color: "#ffffff",
  },
  myApplets: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
});

