import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Referee extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Referee </Text>
      </View>
    );
  }
}

export default Referee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
