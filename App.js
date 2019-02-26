import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

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
        tabBarIcon: ({ tintColor }) => <Icon name="ios-cafe" color={tintColor} size={24} />,
      },
    },
    Referee: {
      screen: Referee,
      navigationOptions: {
        tabBarLable: 'Referee',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-cafe" color={tintColor} size={24} />,
      },
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLable: 'Dashboard',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-cafe" color={tintColor} size={24} />,
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLable: 'History',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-cafe" color={tintColor} size={24} />,
      },
    },
    UserInfo: {
      screen: UserInfo,
      navigationOptions: {
        tabBarLable: 'UserInfo',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-cafe" color={tintColor} size={24} />,
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

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
export default App;
