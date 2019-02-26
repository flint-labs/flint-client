import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Dashboard from './Dashboard';
import DoIt from './DoIt';

class component extends React.Component {
  static navigationOptions = {
    headerTitle: '하염',
  };

  render() {
    return <Dashboard />;
  }
}

export default component;
