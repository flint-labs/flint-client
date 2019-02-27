import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Image, FlatList, ProgressViewIOS,
} from 'react-native';
import styles from './style';
import DoIt from './DoIt';
// import ReportEntry from './ReportEntry';
import RefereeEntry from '../Referee/RefereeEntry';
import { OrangeButton } from '../../components';

const runIcon = require('../../../assets/images/Dashboard/run.png');
// const lineIcon = require('../../../assets/images/Dashboard/line.png');
const fakeData = [
  { title: '1일째', description: '헬스를 다녀오고 식단조절했음', state: '통과' },
  { title: '2일째', description: '노트북과 체크인을 하고 줄넘기를 함', state: '통과' },
  {
    title: '3일째',
    description: '무엇무엇을 했고 밥을 상파울로를 먹었고 김간디를 했음',
    state: '미통과',
  },
  {
    title: '4일째',
    description: '무엇무엇을 했고 밥을 무었을 먹었고 가나다르를 했음',
    state: '통과',
  },
  { title: '5일째', description: '헬스를 다녀오고 식단조절했음', state: '통과' },
];

class Dashboard extends Component {
  state = { modalVisible: false };

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
    return (
      <View style={styles.container}>
        <DoIt modalVisible={modalVisible} hideModal={this.hideModal} />
        <View style={[styles.sloganContainer, { backgroundColor: 'red' }]}>
          <Text style={styles.sloganText}>내가 이번엔 살 진짜 꼭 뺀다.</Text>
        </View>
        <View style={[styles.progressContainer, { backgroundColor: 'blue' }]}>
          <ProgressViewIOS />
          <Image style={styles.runImage} source={runIcon} />
          <View
            style={{
              flex: 0.001,
              flexDirection: 'row',
              margin: '5%',
              backgroundColor: 'black',
            }}
          >
            <View style={{ flex: 1, backgroundColor: '#32CD32', margin: '0.5%' }} />
            <View style={{ flex: 1, backgroundColor: '#32CD32', margin: '0.5%' }} />
            <View style={{ flex: 1, backgroundColor: 'red', margin: '0.5%' }} />
            <View style={{ flex: 1, backgroundColor: '#32CD32', margin: '0.5%' }} />
          </View>
        </View>
        {/* <View> */}
        <FlatList
          data={fakeData}
          renderItem={itemData => <RefereeEntry data={itemData.item} />}
          style={{
            flex: 2.5,
            margin: '5%',
            backgroundColor: 'yellow',
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* </View> */}
        <View style={[styles.doItContainer, { backgroundColor: 'grey' }]}>
          {/* <TouchableOpacity onPress={this.doItHandler} style={styles.submitBtn}>
            <Text style={styles.submitText}>오늘 달성!</Text>
          </TouchableOpacity> */}
          <OrangeButton text="오늘, 달성" />
        </View>
      </View>
    );
  }
}

export default Dashboard;
