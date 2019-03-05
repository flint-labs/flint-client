import React, { Component } from 'react';
import {
  View, Text, Image, Dimensions, Animated,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';
import styles from './style';
import DoIt from './DoIt';
import { OrangeButton } from '../../components';
import ReportEntry from './ReportEntry';
import Select from './Select';
// import sendRequest from '../../modules/sendRequest';

const { width } = Dimensions.get('window');
const runIcon = require('../../../assets/images/Dashboard/run.png');

// const baseUrl = 'http://13.209.19.196:3000';

class Dashboard extends Component {
  state = {
    modalVisible: false,
    isLoaded: false,
    // isHidden: this.props.isHidden,
  };

  componentDidMount = async () => {
    this.setState({ isLoaded: true });
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

  render() {
    const { modalVisible, isLoaded } = this.state;
    const {
      bounceValue,
      toggleSubView,
      handleChallenges,
      challenges,
      recentChallenge,
      handleRecentChallenge,
      reports,
      progress,
    } = this.props;
    const reverseReports = reports.reverse();
    console.log('선재님이 원하는 곳',reverseReports);
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
              handleRecentChallenge={handleRecentChallenge}
              recentChallenge={recentChallenge}
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
            inverted
            swipeThreshold={5}
            data={reverseReports}
            renderItem={({ item }) => <ReportEntry data={item} />}
            sliderWidth={width}
            itemWidth={width * 0.8}
            sliderHeight={270}
            style={{ transform: [{ scaleY: -1 }] }}
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
  handleRecentChallenge: PropTypes.func.isRequired,
  recentChallenge: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  progress: PropTypes.number.isRequired,
};

export default Dashboard;
