import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import History from './History';
import HistoryDetail from './HistoryDetail';
import SignIn from '../SignIn';

class component extends Component {
  goToScreen = (screenName, data, period) => {
    const { navigation } = this.props;
    navigation.navigate(screenName, { detail: data, period });
  };

  render = () => <History switchScreen={this.goToScreen} />;
}

export default createStackNavigator(
  {
    component: {
      screen: component,
      navigationOptions: {
        headerTitle: () => <Text style={{ fontFamily: 'Fontrust', fontSize: 30 }}>Flint</Text>,
      },
    },

    HistoryDetail: {
      screen: HistoryDetail,
    },

    SignIn: {
      screen: SignIn,
    },
  },
  {
    navigationOptions: ({ navigation: { state } }) => ({
      tabBarVisible: !(state.index > 0),
    }),
  },
);
