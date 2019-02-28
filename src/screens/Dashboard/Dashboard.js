import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Image, FlatList, Dimensions, Animated,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';
import styles from './style';
import DoIt from './DoIt';
import { OrangeButton } from '../../components';
import ReportEntry from './ReportEntry';
import Select from './Select';

const { width, height } = Dimensions.get('window');
const runIcon = require('../../../assets/images/Dashboard/run.png');

const fakeData = [
  { title: '5일째', description: '헬스를 다녀오고 식단조절했음', state: '통과' },
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
  { title: '2일째', description: '노트북과 체크인을 하고 줄넘기를 함', state: '통과' },
  { title: '1일째', description: '헬스를 다녀오고 식단조절했음', state: '통과' },
];

class Dashboard extends Component {
  state = {
    modalVisible: false,
    isHidden: this.props.isHidden,
  };

  componentDidMount = () => {
    console.log(this.props.isHidden);
  };

  doItHandler = () => {
    this.setState({
      modalVisible: true,
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { modalVisible } = this.state;
    const { bounceValue, toggleSubView } = this.props;
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.subView, { transform: [{ translateY: bounceValue }], zIndex: 300 }]}
        >
          <Select toggleSubView={toggleSubView} />
        </Animated.View>
        <DoIt modalVisible={modalVisible} hideModal={this.hideModal} />
        <View style={[styles.sloganContainer]}>
          <Text style={styles.sloganText}>내가 이번엔 살 진짜 꼭 뺀다.</Text>
        </View>
        <View style={[styles.progressContainer]}>
          <Image style={styles.runImage} source={runIcon} />
          {/* <View
            style={{
              flex: 1,
              flexDirection: 'row',
              margin: '5%',
              backgroundColor: 'black',
            }}
          > */}
          <Progress.Bar progress={0.3} width={width * 0.8} color="#ff6600" />
          {/* <View style={{ flex: 1, backgroundColor: '#32CD32', margin: '0.5%' }} />
            <View style={{ flex: 1, backgroundColor: '#32CD32', margin: '0.5%' }} />
            <View style={{ flex: 1, backgroundColor: 'red', margin: '0.5%' }} />
            <View style={{ flex: 1, backgroundColor: '#32CD32', margin: '0.5%' }} /> */}
          {/* </View> */}
        </View>
        <Carousel
          layout="stack"
          swipeThreshold={5}
          data={fakeData}
          renderItem={({ item }) => <ReportEntry data={item} />}
          sliderWidth={width}
          itemWidth={width * 0.8}
          sliderHeight={270}
        />
        <View style={[styles.doItContainer]}>
          <OrangeButton text="오늘 달성" onPress={this.doItHandler} />
        </View>
      </View>
    );
  }
}

export default Dashboard;
