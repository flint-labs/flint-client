import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, StatusBar } from 'react-native';
import { Video } from 'expo';
import { NavigationEvents } from 'react-navigation';

import CategoryEntry from './CategoryEntry';
import styles from './Styles';

const { width } = Dimensions.get('window');

const category1 = require('../../../assets/images/Home/cate1.jpg');
const category2 = require('../../../assets/images/Home/cate2.jpg');
const category3 = require('../../../assets/images/Home/cate3.jpg');
const category4 = require('../../../assets/images/Home/cate4.jpg');
const category5 = require('../../../assets/images/Home/cate5.jpg');
const category6 = require('../../../assets/images/Home/cate6.jpg');
const category7 = require('../../../assets/images/Home/cate7.jpg');

const imageArray = [
  [category1, '운동', '더욱 건강해진 자신을 만나보세요.'],
  [category6, '독서', '생각의 깊이를 더하기.'],
  [category2, '생활패턴', '작은 변화가 새로운 일상을 가져옵니다.'],
  [category3, '공부', '한 단계 성장한 나를 위해.'],
  [category4, '식습관', '내 몸 알아가기'],
  [category5, '취미', '나만의 작은 만족'],
  [category7, '환경보호', '작은 실천, 더 나은 세상'],
];

class Intro extends Component {
  state = {
    barColor: 'dark-content',
  };

  render() {
    const { goToScreen } = this.props;
    const { barColor } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle={barColor} />
        <View style={styles.challengeContainer}>
          <View
            style={{
              width,
              backgroundColor: 'white',
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
                  description={imageArray[item.index][2]}
                />
              )}
              numColumns={1}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Intro;
