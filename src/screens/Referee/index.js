import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
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

const { width, height } = Dimensions.get('window');

class Referee extends Component {
  state = {
    isVisible: false,
    image: null,
    modalMessage: '',
  };

  renderRefereeModal = (fakeImage, description) => {
    console.log('run');
    const { isVisible } = this.state;

    this.setState({
      isVisible: !isVisible,
      image: fakeImage,
      modalMessage: description,
    });
  };

  renderModal = () => {
    const { isVisible, image } = this.state;
    return (
      <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(0, 0, 0, .5)"
        overlayBackgroundColor="white"
        width={width - 50}
        height={height - 80}
        style={{ flex: 1, alignItems: 'center' }}
      >
        <View
          style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}
        >
          <Image
            source={image}
            style={{
              flex: 1,
              width: width - 70,
              height: (height - 80) / 2,
              resizeMode: 'cover',
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 3,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>{this.state.modalMessage}</Text>
          </View>
          <View
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({ isVisible: !this.state.isVisible })
              }
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'blue',
                margin: 10,

                borderWidth: 1,
                borderColor: 'green',
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 15, color: 'green' }}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({ isVisible: !this.state.isVisible })
              }
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'yellow',
                margin: 10,

                borderWidth: 1,
                borderColor: 'red',
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 15, color: 'red' }}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    );
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
        {this.renderModal()}
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
