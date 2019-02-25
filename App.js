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

const App = () => <AppContainer />;

export default App;
