import {
  Button,
  Center,
  Toast,
  Text,
  ScrollView,
  VStack,
  Fab,
  Box,
} from 'native-base';
import React, {Component} from 'react';
import Card from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
        <Box position="relative" h={100} w="100%">
          <Fab
            position="absolute"
            renderInPortal={false}
            placement="bottom-left"
            size="sm"
            onPress={() => this.props.navigation.navigate('services')}
            icon={
              <Icon size={25} color="white" name="apps" />
            }
          />
        </Box>
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
    backgroundColor: 'aliceblue',
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
