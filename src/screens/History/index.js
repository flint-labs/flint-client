import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import History from './History';

const component = () => <History />;

export default createStackNavigator({
  component: {
    screen: component,
    navigationOptions: { headerTitle: 'History' },
  },
});
