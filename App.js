import React from 'react';
import { Provider } from 'react-redux';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Font, Notifications } from 'expo';
import {
  View, AsyncStorage, ActivityIndicator, YellowBox,
} from 'react-native';
import Home from './src/screens/Home';
import Referee from './src/screens/Referee';
import Dashboard from './src/screens/Dashboard';
import History from './src/screens/History';
import UserInfo from './src/screens/UserInfo';
import sendRequest from './src/modules/sendRequest';
import registerPushToken from './src/modules/registerForPushNotificationsAsync';
import store from './store';

// const io = socketio('http://13.209.19.196:3000');
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

const isChallenge = async () => {
  const user = JSON.parse(await AsyncStorage.getItem('userInfo'));
  if (!user) return false;
  const { data } = await sendRequest('get', `/api/challenges/getInProgressChallenges/${user.id}`);
  if (data.challenges.length) return true;
  return false;
};

const Root = initialRouteName => createBottomTabNavigator(
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
    initialRouteName,
  },
);

const AppContainer1 = createAppContainer(Root('Home'));
const AppContainer2 = createAppContainer(Root('Dashboard'));
const Fontrust = require('./assets/fonts/Fontrust.ttf');

class App extends React.Component {
  state = {
    isLoaded: false,
    isHome: true,
    notification: {},
  };

  async componentDidMount() {
    // 저장된 유저정보가 바뀔 때마다 새로 받아야 하는데 아직 그러지 못하고 있음.
    // 앱이 꺼지면 유지 못하고 있음
    this.notificationSubscription = Notifications.addListener(this.handleNotification);
    registerPushToken(); // 앱시작했을 때 허락요청
    // if (user !== null) {
    //   io.on(user.id, async () => {
    //     pushNotification();
    //   });
    // }
    await Font.loadAsync({
      Fontrust,
    });
    const isHome = !(await isChallenge());

    this.setState({ isLoaded: true, isHome });
  }

  handleNotification = notification => {
    this.setState({ notification });
  };

  render() {
    const { isLoaded, isHome } = this.state;
    if (isLoaded) {
      return <Provider store={store}>{isHome ? <AppContainer1 /> : <AppContainer2 />}</Provider>;
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
}
export default App;
