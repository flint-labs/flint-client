import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';

import Referee from '../Referee';
import Dashboard from '../Dashboard';
import History from '../History';
import UserInfo from '../UserInfo';

import Intro from './Intro';
import Feedback from './Feedback';

import styles from './Styles';

const { width } = Dimensions.get('window');

const Home = () => (
  <View style={styles.indexContainer}>
    <ScrollView style={{ flex: 1, width }}>
      <Intro />
      <Feedback />
    </ScrollView>
  </View>
);

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLable: 'HOME',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-cafe" color={tintColor} size={24} />
        ),
        header: {
          visible: false,
        },
      },
    },
    Referee: {
      screen: Referee,
      navigationOptions: {
        tabBarLable: 'Referee',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-cafe" color={tintColor} size={24} />
        ),
        header: {
          visible: false,
        },
      },
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLable: 'Dashboard',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-cafe" color={tintColor} size={24} />
        ),
        header: {
          visible: false,
        },
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLable: 'History',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-cafe" color={tintColor} size={24} />
        ),
        header: {
          visible: false,
        },
      },
    },
    UserInfo: {
      screen: UserInfo,
      navigationOptions: {
        tabBarLable: 'UserInfo',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-cafe" color={tintColor} size={24} />
        ),
        header: {
          visible: false,
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);
