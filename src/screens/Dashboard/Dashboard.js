import React, { Component } from 'react';
import {
  View, Text, Image, Dimensions, Animated, AsyncStorage,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';
import styles from './style';
import DoIt from './DoIt';
import { OrangeButton } from '../../components';
import ReportEntry from './ReportEntry';
import Select from './Select';

const { width } = Dimensions.get('window');
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
    recentChallenge: null,
    // isHidden: this.props.isHidden,
  };

  componentDidMount = async () => {
    // console.log(this.props.isHidden);
    const { challenges } = this.props;
    const asyncRecentChallenge = JSON.parse(await AsyncStorage.getItem('recentChallenge'));
    this.setState({ recentChallenge: asyncRecentChallenge || challenges[0] });
  };

  doItHandler = () => {
    this.setState({
      modalVisible: true,
    });
  };

  toggleModal = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  handleRecentChallenge = (challenge) => {
    this.setState({ recentChallenge: challenge });
  };

  render() {
    const { modalVisible, recentChallenge } = this.state;
    const {
      bounceValue,
      toggleSubView,
      handleChallenges,
      challenges,
      handleDashboardTitle,
    } = this.props;

    return recentChallenge ? (
      <View style={styles.container}>
        <Animated.View
          style={[styles.subView, { transform: [{ translateY: bounceValue }], zIndex: 300 }]}
        >
          <Select
            toggleSubView={toggleSubView}
            handleChallenges={handleChallenges}
            challenges={challenges}
            handleRecentChallenge={this.handleRecentChallenge}
            recentChallenge={recentChallenge}
            handleDashboardTitle={handleDashboardTitle}
          />
        </Animated.View>
        <DoIt
          modalVisible={modalVisible}
          toggleModal={this.toggleModal}
          recentChallenge={recentChallenge}
        />
        <View style={[styles.sloganContainer]}>
          <Text style={styles.sloganText}>{recentChallenge.slogan}</Text>
        </View>
        <View style={[styles.progressContainer]}>
          <Image style={styles.runImage} source={runIcon} />
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
    ) : (
      <Text>Loading</Text>
    );
  }
}

Dashboard.propTypes = {
  bounceValue: PropTypes.shape({
    _value: PropTypes.number.isRequired,
  }).isRequired,
  toggleSubView: PropTypes.func.isRequired,
  challenges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slogan: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  handleChallenges: PropTypes.func.isRequired,
  handleDashboardTitle: PropTypes.func.isRequired,
};

export default Dashboard;
