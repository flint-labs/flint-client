import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { createStackNavigator, NavigationEvents } from 'react-navigation';

import Intro from './Intro';
import Feedback from './Feedback';

import ChallengeSetting from '../ChallengeSetting';

import styles from './Styles';

const { width } = Dimensions.get('window');

class Home extends Component {
  state = {
    isSetting: false,
  };

  handleSetting = () => {
    this.setState({ isSetting: true });
  };

  goToScreen = (screenName, cate) => {
    const { navigation } = this.props;
    navigation.navigate(screenName, {
      category: cate,
      setting: this.handleSetting,
    });
  };

  handleWillFocus = () => {
    const { isSetting } = this.state;
    const { navigation } = this.props;

    if (isSetting) {
      this.setState({ isSetting: false });
      navigation.navigate('Dashboard');
    }
  };

  render = () => (
    <View style={{ flex: 1 }}>
      <NavigationEvents onWillFocus={this.handleWillFocus} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.indexContainer}>
          <ScrollView style={{ flex: 1, width }}>
            <Intro goToScreen={this.goToScreen} />
            <Feedback />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
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
    navigationOptions: ({ navigation: { state } }) => ({
      tabBarVisible: !(state.index > 0),
    }),
  },
);
