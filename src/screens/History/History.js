import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HistoryEntry from './HistoryEntry';

const fakeData = [
  {
    title: '살 15키로 빼기',
    description: '살을 뺄것이야',
    state: '성공',
  },
  {
    title: '살 15키로 빼기',
    description: '살을 뺄것이야',
    state: '성공',
  },
  {
    title: '살 15키로 빼기',
    description: '살을 뺄것이야',
    state: '성공',
  },
];

class History extends React.Component {
  state = { data: fakeData };

  render() {
    const { data } = this.state;
    return (
      <View>
        {data.map(el => (
          <View>
            <HistoryEntry data={el} />
          </View>
        ))}
      </View>
    );
  }
}

export default createStackNavigator({ History });
