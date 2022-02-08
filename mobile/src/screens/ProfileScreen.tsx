import {
  Button,
  Center,
  Toast,
  Text,
  VStack,
  Fab,
  Box,
} from 'native-base';
import React, {Component} from 'react';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, View, ScrollView } from 'react-native';
import { Subheading } from 'react-native-paper';

export default class ProfileScreen extends Component {
  constructor(props: any) {
    super(props);
  }

  mainTextRender() {
    return (
        <VStack id="mainText" alignItems="center" style={styles.mainText}>
            <Text fontFamily="body" fontWeight={400} fontSize ="3xl">Profile</Text>
        </VStack>
    );
  }

  descriptionTextRender() {
    return (
        <VStack id="descriptionText" alignItems="center" style={styles.mainText}>
            <Text fontFamily="body" fontWeight={200} fontSize ="2xl">First name</Text>
            <Text fontFamily="body" fontWeight={200} fontSize ="2xl">Last name</Text>
            <Text fontFamily="body" fontWeight={200} fontSize ="2xl">E-Mail</Text>
        </VStack>
    );
  }

  createPasswordButtonRender() {
    return (
      <View id="changePassword" >
          <Button mode="contained" style={styles.createPasswordButton} onPress={() => this.props.navigation.navigate('applets')}>
            <Text style={styles.createPasswordText}>Change Password</Text>
            {/* PUT A FORM TO GET NEW PASSWORD x2 */}
          </Button>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.mainTextRender()}
        {this.descriptionTextRender()}
        {this.createPasswordButtonRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
  },
  safeAreaView: {
    backgroundColor: "#DCDCDC",
  },
  createPasswordButton: {
        bottom: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        backgroundColor: "#222222",
  },
  createPasswordText: {
    color: "#ffffff",
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  myApplets: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  mainText: {
    marginTop:0,
  },
});
