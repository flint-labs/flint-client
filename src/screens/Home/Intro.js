import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';

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

const Intro = () => (
  <View style={styles.container}>
    <View style={styles.imgContainer}>
      <View
        style={{
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image source={introImage} style={styles.img} />
        <Text
          style={{
            position: 'absolute',
            color: 'white',
            fontSize: 22,
          }}
        >
          당신의 삶을 변화시켜 보세요
        </Text>
      </View>
    </View>
    <View style={styles.challengeContainer}>
      <FlatList
        data={imageArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
          <CategoryEntry
            img={imageArray[item.index][0]}
            title={imageArray[item.index][1]}
          />
        )}
        numColumns={2}
      />
    </View>
  </View>
);

export default Intro;
