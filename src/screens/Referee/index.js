import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import styles from './Styles';
import RefereeEntry from './RefereeEntry';

const fakeData = [
  { title: 'TIL', description: '매일 TIL 하나씩 쓰기', state: 'pendding' },
  { title: 'TIL', description: '매일 TIL 하나씩 쓰기', state: 'pendding' },
  { title: 'TIL', description: '매일 TIL 하나씩 쓰기', state: 'pendding' },
  { title: 'TIL', description: '매일 TIL 하나씩 쓰기', state: 'pendding' },
];

const Referee = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <FlatList
        data={fakeData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={itemData => <RefereeEntry data={itemData.item} />}
      />
    </View>
  </SafeAreaView>
);

export default createStackNavigator({
  Referee: {
    screen: Referee,
    navigationOptions: {
      headerTitle: () => (
        <Text style={{ fontFamily: 'Fontrust', fontSize: 30 }}>Flint</Text>
      ),
    },
  },
});
