import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';

import HistoryReportEntry from './HistoryReportEntry';

import styles from './style';

const { width } = Dimensions.get('window');

const fakeData = [
  {
    title: '5일째',
    description: '헬스를 다녀오고 식단조절했음',
    state: '통과',
  },
  {
    title: '4일째',
    description: '무엇무엇을 했고 밥을 무었을 먹었고 가나다르를 했음',
    state: '통과',
  },
  {
    title: '3일째',
    description: '무엇무엇을 했고 밥을 상파울로를 먹었고 김간디를 했음',
    state: '미통과',
  },
  {
    title: '2일째',
    description: '노트북과 체크인을 하고 줄넘기를 함',
    state: '통과',
  },
  {
    title: '1일째',
    description: '헬스를 다녀오고 식단조절했음',
    state: '통과',
  },
];

class HistoryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="ios-arrow-round-back" size={35} />
        </TouchableOpacity>
      ),
      headerStyle: {
        borderColor: 'white',
      },
    };
  };

  render = () => {
    const { title, state, period } = this.props.navigation.getParam('detail');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>{period}주 도전</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Progress.Bar progress={0.8} width={width * 0.8} color="#ff6600" />
        </View>
        <View style={{ flex: 4 }}>
          <Carousel
            layout="stack"
            swipeThreshold={5}
            data={fakeData}
            renderItem={({ item }) => <HistoryReportEntry data={item} />}
            sliderWidth={width}
            itemWidth={width * 0.8}
          />
        </View>
      </View>
    );
  };
}

export default HistoryDetail;
