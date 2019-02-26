import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation';

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

export default createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Flint',
    },
  },
});
