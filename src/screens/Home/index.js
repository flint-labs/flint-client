import React from 'react';
import { View, Text, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Intro from './Intro';
import Feedback from './Feedback';

import styles from './Styles';

const { width } = Dimensions.get('window');

const Home = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.indexContainer}>
      <ScrollView style={{ flex: 1, width }}>
        <Intro />
        <Feedback />
      </ScrollView>
    </View>
  </SafeAreaView>
);

export default createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: () => (
        <Text style={{ fontFamily: 'Fontrust', fontSize: 30 }}>Flint</Text>
      ),
    },
  },
});
