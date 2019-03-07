import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Font } from 'expo';
import { View, Text } from 'react-native';

import Home from './src/screens/Home';
import Referee from './src/screens/Referee';
import Dashboard from './src/screens/Dashboard';
import History from './src/screens/History';
import UserInfo from './src/screens/UserInfo';

const Root = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLable: 'HOME',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" color={tintColor} size={24} />
        ),
      },
    },
    Referee: {
      screen: Referee,
      navigationOptions: {
        tabBarLable: 'Referee',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-megaphone" color={tintColor} size={24} />
        ),
      },
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLable: 'Dashboard',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-bicycle" color={tintColor} size={24} />
        ),
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLable: 'History',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-ribbon" color={tintColor} size={24} />
        ),
      },
    },
    MyPage: {
      screen: UserInfo,
      navigationOptions: {
        tabBarLable: 'UserInfo',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={24} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);

const AppContainer = createAppContainer(Root);
const Fontrust = require('./assets/fonts/Fontrust.ttf');

class App extends React.Component {
  state = {
    isLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Fontrust,
    });
    this.setState({ isLoaded: true });
  }

  render() {
    const { isLoaded } = this.state;
    return isLoaded ? (
      <AppContainer />
    ) : (
      <View style={{ flex: 1 }}>
        <Text>Loading</Text>
      </View>
    );
  }
}
export default App;
