import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, StatusBar } from 'react-native';
import { Video } from 'expo';
import { NavigationEvents } from 'react-navigation';

import CategoryEntry from './CategoryEntry';
import styles from './Styles';

const { width } = Dimensions.get('window');

const video = require('../../../assets/video/Flint.mp4');
const category1 = require('../../../assets/images/Home/cate1.jpg');
const category2 = require('../../../assets/images/Home/cate2.jpg');
const category3 = require('../../../assets/images/Home/cate3.jpg');
const category4 = require('../../../assets/images/Home/cate4.jpg');

const imageArray = [
  [category1, '운동'],
  [category2, '생활패턴'],
  [category3, '공부'],
  [category4, '식습관'],
];

class Intro extends Component {
  state = {
    isPlay: true,
    barColor: 'light-content',
  };

  handleWillFocus = () => {
    this.setState({ isPlay: true, barColor: 'light-content' });
  };

  handleWillBlur = () => {
    this.setState({ isPlay: false, barColor: 'dark-content' });
  };

  render() {
    const { goToScreen } = this.props;
    const { barColor, isPlay } = this.state;
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={this.handleWillFocus}
          onWillBlur={this.handleWillBlur}
        />
        <StatusBar barStyle={barColor} />
        <View style={styles.imgContainer}>
          <View style={{ position: 'relative' }}>
            <Video
              source={video}
              rate={1.0}
              isMuted
              isLooping
              shouldPlay={isPlay}
              resizeMode="cover"
              style={{ flex: 1, height: 300 }}
            />
            <View style={{ position: 'absolute', width, height: 300 }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Fontrust',
                    fontSize: 55,
                    color: 'white',
                  }}
                >
                  Change Your Life
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.challengeContainer}>
          <View
            style={{
              width,
              backgroundColor: 'white',
              marginLeft: 6,
              marginTop: 6,
              marginBottom: 6,
              height: width * 0.7,
            }}
          >
            <FlatList
              data={imageArray}
              keyExtractor={(item, index) => index.toString()}
              renderItem={item => (
                <CategoryEntry
                  img={imageArray[item.index][0]}
                  title={imageArray[item.index][1]}
                  goToScreen={goToScreen}
                />
              )}
              numColumns={3}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Intro;
