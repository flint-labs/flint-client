import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Dashboard from './Dashboard';
import DoIt from './DoIt';

const component = () => <Dashboard />;

export default createStackNavigator(
  {
    component: {
      screen: component,
      navigationOptions: {
        headerTitle: (
          <TouchableOpacity>
            <Text>제목</Text>
          </TouchableOpacity>
        ),
      },
    },
    Dashboard: {
      screen: Dashboard,
    },
  },
  {
    mode: 'modal',
  },
);
