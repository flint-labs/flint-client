import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Font } from 'expo';
import { View, Text, AsyncStorage } from 'react-native';

import Home from './src/screens/Home';
import Referee from './src/screens/Referee';
import Dashboard from './src/screens/Dashboard';
import History from './src/screens/History';
import UserInfo from './src/screens/UserInfo';
import sendRequest from './src/modules/sendRequest';

const isChallenge = async () => {
  const user = JSON.parse(await AsyncStorage.getItem('userInfo'));
  // console.log(Boolean(user));
  if (!user) return false;
  // console.log('aaaaa');
  const { data } = await sendRequest('get', `/api/challenges/getInProgressChallenges/${user.id}`);
  console.log(JSON.stringify(data.challenges));
  if (data.challenges.length) return true;
  return false;
};

console.log(isChallenge());

const Root1 = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLable: 'HOME',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-home" color={tintColor} size={24} />,
      },
    },
    Referee: {
      screen: Referee,
      navigationOptions: {
        tabBarLable: 'Referee',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-megaphone" color={tintColor} size={24} />,
      },
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLable: 'Dashboard',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-bicycle" color={tintColor} size={24} />,
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLable: 'History',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-ribbon" color={tintColor} size={24} />,
      },
    },
    MyPage: {
      screen: UserInfo,
      navigationOptions: {
        tabBarLable: 'UserInfo',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-person" color={tintColor} size={24} />,
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
    initialRouteName: 'Home',
  },
);

const Root2 = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLable: 'HOME',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-home" color={tintColor} size={24} />,
      },
    },
    Referee: {
      screen: Referee,
      navigationOptions: {
        tabBarLable: 'Referee',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-megaphone" color={tintColor} size={24} />,
      },
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLable: 'Dashboard',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-bicycle" color={tintColor} size={24} />,
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLable: 'History',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-ribbon" color={tintColor} size={24} />,
      },
    },
    MyPage: {
      screen: UserInfo,
      navigationOptions: {
        tabBarLable: 'UserInfo',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-person" color={tintColor} size={24} />,
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
    initialRouteName: 'Dashboard',
  },
);

const AppContainer1 = createAppContainer(Root1);
const AppContainer2 = createAppContainer(Root2);
const Fontrust = require('./assets/fonts/Fontrust.ttf');

class App extends React.Component {
  state = {
    isLoaded: false,
    isHome: true,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Fontrust,
    });
    const isHome = !(await isChallenge());
    console.log(isHome);
    this.setState({ isLoaded: true, isHome });
  }

  render() {
    const { isLoaded, isHome } = this.state;
    if (isLoaded) {
      return isHome ? <AppContainer1 /> : <AppContainer2 />;
    }
    return (
      <View style={{ flex: 1 }}>
        <Text>Loading</Text>
      </View>
    );
  }
}
export default App;
