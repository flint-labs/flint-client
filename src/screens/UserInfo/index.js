import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';

import SignIn from '../SignIn';
import SignUp from '../SignUp';
import styles from './styles';

const {
  redButton, userInfoArea, adBoxOuter,
  adBoxInner, userInfoEntry,
} = styles;

const userInfo = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'space-between' }}>
    <View style={userInfoArea}>
      <Text style={userInfoEntry}>walli@gmail.com</Text>
      <Text style={userInfoEntry}>크라이스트 박</Text>
      <Text style={userInfoEntry}>남자</Text>
      <Text style={userInfoEntry}>BC 0</Text>
      <Text style={userInfoEntry}>나사렛</Text>
      <Text>{' '}</Text>
      <TouchableOpacity>
        <Text style={{ ...redButton, ...userInfoEntry }}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={{ ...redButton, ...userInfoEntry }}>Delete Account</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity
      style={adBoxOuter}
      onPress={() => navigation.navigate('SignIn')}
    >
      <View style={adBoxInner}>
        <Text>Hello World</Text>
      </View>
    </TouchableOpacity>
  </View>
);

userInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default createStackNavigator({
  userInfo: {
    screen: userInfo,
  },
  SignIn: {
    screen: SignIn,
  },
  SignUp: {
    screen: SignUp,
  },
});
