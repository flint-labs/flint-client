import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Overlay } from 'react-native-elements';

import styles from './Styles';
import RefereeEntry from './RefereeEntry';

const fakeData = [
  { title: 'TIL', description: '매일 TIL 하나씩 쓰기', state: 'pendding' },
  { title: 'TIL', description: '매일 TIL 하나씩 쓰기', state: 'pendding' },
  { title: 'TIL', description: '매일 TIL 하나씩 쓰기', state: 'pendding' },
  { title: 'TIL', description: '매일 TIL 하나씩 쓰기', state: 'pendding' },
];

class Referee extends Component {
  state = {
    isVisible: false,
  };

  renderRefereeModal = () => {
    console.log('run');
    const { isVisible } = this.state;

    this.setState({ isVisible: !isVisible });
  };

  render = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            data={fakeData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={itemData => (
              <RefereeEntry
                data={itemData.item}
                modal={this.renderRefereeModal}
              />
            )}
          />
        </View>
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(0, 0, 0, .5)"
          overlayBackgroundColor="white"
          width={150}
          height={150}
        >
          <Text>Hello from Overlay!</Text>
          <Button
            title="ok"
            onPress={() => this.setState({ isVisible: !this.state.isVisible })}
          />
        </Overlay>
      </SafeAreaView>
    );
  };
}

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
