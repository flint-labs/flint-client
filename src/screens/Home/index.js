import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Intro from './Intro';
import Feedback from './Feedback';

import ChallengeSetting from '../ChallengeSetting';

import styles from './Styles';

const { width } = Dimensions.get('window');

class Home extends Component {
  goToScreen = screenName => {
    const { navigation } = this.props;
    navigation.navigate(screenName);
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    navigation.addListener('didFocus', () => navigation.popToTop());
  };

  render = () => (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.indexContainer}>
        <ScrollView style={{ flex: 1, width }}>
          <Intro goToScreen={this.goToScreen} />
          <Feedback />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: () => (
          <Text style={{ fontFamily: 'Fontrust', fontSize: 30 }}>Flint</Text>
        ),
      },
    },
    ChallengeSetting: {
      screen: ChallengeSetting,
      navigationOptions: {
        headerTitle: () => (
          <Text style={{ fontFamily: 'Fontrust', fontSize: 30 }}>Flint</Text>
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);
