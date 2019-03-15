import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import History from './History';
import HistoryDetail from './HistoryDetail';
import SignIn from '../SignIn';

class component extends Component {
  goToScreen = (screenName, data, period) => {
    const { navigation } = this.props;
    navigation.navigate(screenName, { detail: data, period });
  };

  goToHome = () => {
    const { navigation } = this.props;
    navigation.navigate('Home');
  };

  render = () => (
    <History switchScreen={this.goToScreen} goToHome={this.goToHome} />
  );
}

export default createStackNavigator(
  {
    component: {
      screen: component,
      navigationOptions: {
        headerTitle: () => (
          <Text style={{ fontFamily: 'Fontrust', fontSize: 30 }}>Flint</Text>
        ),
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

component.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
