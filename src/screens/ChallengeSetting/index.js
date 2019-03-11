import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import IsOnGoing from './IsOnGoing';
import Title from './Title';
import ChallengePeriod from './ChallengePeriod';
import StartAt from './StartAt';
import Mode from './Mode';
import CheckingPeriod from './CheckingPeriod';
import Amount from './Amount';
import Receipient from './Receipient';
import Slogan from './Slogan';
import PaymentMethod from './PaymentMethod';
import StartChallenge from './StartChallenge';

const headerOptions = isFirst => ({ navigation }) => ({
  headerTitle: () => (
    <Text style={{ fontFamily: 'Fontrust', fontSize: 30 }}>Flint</Text>
  ),
  headerLeft: (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        marginLeft: 10,
        paddingRight: 30,
        alignItems: 'center',
      }}
      onPress={() => (isFirst ? navigation.popToTop() : navigation.goBack())}
    >
      <Icon name="ios-arrow-round-back" size={35} />
    </TouchableOpacity>
  ),
  gesturesEnabled: false,
  headerStyle: { borderColor: 'white' },
});

export default createStackNavigator({
  IsOnGoing: {
    screen: IsOnGoing,
    navigationOptions: headerOptions(true),
  },
  Title: {
    screen: Title,
    navigationOptions: headerOptions(false),
  },
  ChallengePeriod: {
    screen: ChallengePeriod,
    navigationOptions: headerOptions(false),
  },
  StartAt: {
    screen: StartAt,
    navigationOptions: headerOptions(false),
  },
  Mode: {
    screen: Mode,
    navigationOptions: headerOptions(false),
  },
  CheckingPeriod: {
    screen: CheckingPeriod,
    navigationOptions: headerOptions(false),
  },
  Amount: {
    screen: Amount,
    navigationOptions: headerOptions(false),
  },
  Receipient: {
    screen: Receipient,
    navigationOptions: headerOptions(false),
  },
  Slogan: {
    screen: Slogan,
    navigationOptions: headerOptions(false),
  },
  PaymentMethod: {
    screen: PaymentMethod,
    navigationOptions: headerOptions(false),
  },
}, {
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
    },
  }),
});
