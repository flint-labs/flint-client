import React, { Component } from 'react';
import {
  View, Text, Image, Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';
import styles from './style';
import DoIt from './DoIt';
import { OrangeButton } from '../../components';
import ReportEntry from './ReportEntry';

const { width } = Dimensions.get('window');
const runIcon = require('../../../assets/images/Dashboard/run.png');
const readyRun2Image = require('../../../assets/images/Dashboard/readyRun2.png');

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
    if (isLoaded) {
      if (recentChallenge.state === 'inProgress') {
        return (
          <View style={styles.container}>
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
            </View>
            {reports.length ? (
              <Carousel
                layout="stack"
                inverted
                swipeThreshold={5}
                data={reports}
                renderItem={({ item }) => <ReportEntry data={item} />}
                sliderWidth={width}
                itemWidth={width * 0.8}
                sliderHeight={270}
                style={{ transform: [{ scaleY: -1 }] }}
              />
            ) : (
              <View style={styles.nonReportsTextContainer}>
                <Text style={{ fontSize: 15 }}>기록이 아직 없어요</Text>
              </View>
            )}
            <View style={[styles.doItContainer]}>
              <OrangeButton text="오늘 달성" onPress={this.doItHandler} />
            </View>
          </View>
        );
      }
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Image
              source={readyRun2Image}
              style={{
                height: 100,
                resizeMode: 'contain',
                width: 100,
              }}
            />
          </View>
          <Text style={{ fontSize: 20, flex: 1 }}>아직 시작되지 않은 도전입니다</Text>
        </View>
      );
    }
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
