import React from 'react';
import { ScrollView } from 'react-native';
// import { createStackNavigator } from 'react-navigation';
import HistoryEntry from './HistoryEntry';

const fakeData = [
  {
    title: '살 15키로 빼기',
    description: '살을 뺄것이야',
    state: '성공',
    id: 'a1',
  },
  {
    title: '살 15키로 빼기',
    description: '살을 뺄것이야',
    state: '성공',
    id: '12',
  },
  {
    title: '살 15키로 빼기',
    description: '살을 뺄것이야',
    state: '성공',
    id: '011',
  },
  {
    title: '살 15키로 빼기',
    description: '살을 뺄것이야',
    state: '성공',
    id: '081',
  },
  {
    title: '살 15키로 빼기',
    description: '살을 뺄것이야',
    state: '성공',
    id: '091',
  },
  {
    title: '살 15키로 빼기',
    description: '살을 뺄것이야',
    state: '성공',
    id: '0101',
  },
];

class History extends React.Component {
  state = { data: fakeData };

  render() {
    const { data } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        {data.map(el => (
          <HistoryEntry data={el} key={el.id} />
        ))}
      </ScrollView>
    );
  }
}

export default History;
