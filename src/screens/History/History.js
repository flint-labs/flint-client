import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, Dimensions, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
// import { createStackNavigator } from 'react-navigation';
import HistoryEntry from './HistoryEntry';
import styles from './style';

const fakeData = [
  {
    title: '살 15키로 빼기',
    period: 8,
    state: false,
    id: 'a1',
  },
  {
    title: '살 15키로 빼기',
    period: 8,
    state: true,
    id: '12',
  },
  {
    title: '살 15키로 빼기',
    period: 8,
    state: false,
    id: '011',
  },
  {
    title: '살 15키로 빼기',
    period: 8,
    state: false,
    id: '081',
  },
  {
    title: '살 15키로 빼기',
    period: 8,
    state: true,
    id: '091',
  },
  {
    title: '살 15키로 빼기',
    period: 8,
    state: true,
    id: '0101',
  },
];

class History extends Component {
  render = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            data={fakeData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={itemData => (
              <HistoryEntry
                data={itemData.item}
                handlePress={this.props.switchScreen}
              />
            )}
          />
        </View>
      </SafeAreaView>
    );
  };
}

export default History;
