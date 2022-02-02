import {Button, Center, Toast, Text, ScrollView, VStack} from 'native-base';
import React, {Component} from 'react';
import Card from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View } from 'react-native';

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

  render() {
    return (
      <ScrollView>
        <Center>
          <View style={styles.row}>
            <Card
              title="Youtube"
              description="blablabla description"
              backgroundColor="#ff4545"
            />
            <Card
              title="Youtube"
              description="blablabla description"
              backgroundColor="#ff4545"
            />
            <Card
              title="Youtube"
              description="blablabla description"
              backgroundColor="#ff4545"
            />
            <Card
              title="Youtube"
              description="blablabla description"
              backgroundColor="#ff4545"
            />
            <Card
              title="Youtube"
              description="blablabla description"
              backgroundColor="#ff4545"
            />
            <Card
              title="Youtube"
              description="blablabla description"
              backgroundColor="#ff4545"
            />
            <Card
              title="Youtube"
              description="blablabla description"
              backgroundColor="#ff4545"
            />
            <Card
              title="Youtube"
              description="blablabla description"
              backgroundColor="#ff4545"
            />
            <Card
              title="Youtube"
              description="blablabla description"
              backgroundColor="#ff4545"
            />
            <Card
              title="Youtube"
              description="blablabla description"
              backgroundColor="#ff4545"
            />
            <Card
              title="Youtube"
              description="blablabla description"
              backgroundColor="#ff4545"
            />
            <Card
              title="Youtube"
              description="blablabla description"
              backgroundColor="#ff4545"
            />
          </View>
        </Center>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

