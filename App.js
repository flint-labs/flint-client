import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './src/screens/Home';

const RootStack = createStackNavigator(
  {
    Home,
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(RootStack);

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
export default App;
