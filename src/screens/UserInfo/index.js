import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const {
  redButton, userInfoArea, adBoxOuter,
  adBoxInner, userInfoEntry,
} = styles;

const userInfo = () => (
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
    >
      <View style={adBoxInner}>
        <Text>Hello World</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default userInfo;
