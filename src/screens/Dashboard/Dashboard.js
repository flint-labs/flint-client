import React, { Component } from 'react';
import {
  View, Text, Image, Dimensions, Animated, AsyncStorage,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './style';
import DoIt from './DoIt';
import { OrangeButton } from '../../components';
import ReportEntry from './ReportEntry';
import Select from './Select';
// import sendRequest from '../../modules/sendRequest';

const { width } = Dimensions.get('window');
const runIcon = require('../../../assets/images/Dashboard/run.png');

const baseUrl = 'http://13.209.19.196:3000';

class Dashboard extends Component {
  state = {
    modalVisible: false,
    recentChallenge: null,
    reports: null,
    isLoaded: false,
    progress: null,
    // isHidden: this.props.isHidden,
  };

  componentDidMount = async () => {
    // console.log(this.props.isHidden);
    const { challenges } = this.props;
    const asyncRecentChallenge = JSON.parse(await AsyncStorage.getItem('recentChallenge'));
    this.setState({ recentChallenge: asyncRecentChallenge || challenges[0] });
    const { recentChallenge } = this.state;
    const response = await axios.get(`${baseUrl}/api/reports/getReports/${recentChallenge.id}`);
    // console.log(recentChallenge.id);
    // console.log(JSON.stringify(response));
    this.setState({ reports: response.data.reports });
    this.setState({ progress: await this.calculateProgress() });
    this.setState({ isLoaded: true });
    // console.log('확인');
    // this.calculateProgress();
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

  handleRecentChallenge = challenge => {
    this.setState({ recentChallenge: challenge });
  };

  calculateProgress = async () => {
    const { recentChallenge, reports } = this.state;
    const week = (new Date(recentChallenge.endAt) - new Date(recentChallenge.startAt)) / (86400000 * 7);
    // console.log(
    //   ,
    // );
    const result = await (reports.filter(el => el.isConfirmed === 'true').length
      / (week * recentChallenge.checkingPeriod));
    // console.log(result);
    return result;
  };

  render() {
    const {
      modalVisible, recentChallenge, reports, isLoaded, progress,
    } = this.state;
    const {
      bounceValue,
      toggleSubView,
      handleChallenges,
      challenges,
      handleDashboardTitle,
    } = this.props;
    console.log(bounceValue);
    if (isLoaded) {
      // if (recentChallenge.state === 'inProgress') {
      return (
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
            <Progress.Bar progress={progress} width={width * 0.8} color="#ff6600" />
            <Text style={{ marginTop: 3 }}>
              {(progress * 100).toFixed(1)}
%
            </Text>
            {/* <View style={{ flex: 1, backgroundColor: '#32CD32', margin: '0.5%' }} />
            <View style={{ flex: 1, backgroundColor: '#32CD32', margin: '0.5%' }} />
            <View style={{ flex: 1, backgroundColor: 'red', margin: '0.5%' }} />
            <View style={{ flex: 1, backgroundColor: '#32CD32', margin: '0.5%' }} /> */}
            {/* </View> */}
          </View>
          <Carousel
            layout="stack"
            swipeThreshold={5}
            data={reports}
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
    return <Text>아직 시작되지 않은 도전입니다</Text>;
    // }
    return <Text>Loading</Text>;
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
