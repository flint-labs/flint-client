import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import History from './History';
import HistoryDetail from './HistoryDetail';

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
      navigationOptions: { headerTitle: 'History' },
    },

    HistoryDetail: {
      screen: HistoryDetail,
    },
  },
  {
    navigationOptions: ({ navigation: { state } }) => ({
      tabBarVisible: !(state.index > 0),
    }),
  },
);
