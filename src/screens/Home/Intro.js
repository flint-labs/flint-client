import React from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';

import CategoryEntry from './CategoryEntry';
import styles from './Styles';

const introImage = require('../../../assets/images/Home/Intro.jpg');
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

const Intro = ({ goToScreen }) => (
  <View style={styles.container}>
    <View style={styles.imgContainer}>
      <ImageBackground source={introImage} style={styles.img}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text
            style={{ fontFamily: 'Fontrust', fontSize: 65, color: 'white' }}
          >
            Change Your Life
          </Text>
        </View>
      </ImageBackground>
    </View>
    <View style={styles.challengeContainer}>
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
        numColumns={2}
      />
    </View>
  </View>
);

export default Intro;
