<<<<<<< HEAD
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
=======
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Dashboard </Text>
      </View>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
>>>>>>> 070038ce0b9fea0fc5ce5bf6c771564cf9a816e0
