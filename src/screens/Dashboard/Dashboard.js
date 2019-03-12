import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';
import styles from './style';
import DoIt from './DoIt';
import { OrangeButton } from '../../components';
import ReportEntry from './ReportEntry';

const { width } = Dimensions.get('window');
// const runIcon = require('../../../assets/images/Dashboard/run.png');
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

  wasDoIt = () => {
    const { recentChallenge, reports } = this.props;
    const recentReportDate = reports.length
      ? reports[reports.length - 1].createdAt.slice(0, 10)
      : '';
    const { endAt, startAt } = recentChallenge;
    const A_DAY = 86400000;
    const challengesWeeks = (new Date(endAt) - new Date(startAt)) / A_DAY / 7;
    for (let i = 0; i < challengesWeeks; i += 1) {
      let start = new Date(startAt);
      let end = new Date(startAt);
      const today = new Date();
      start = new Date(start.getTime() + A_DAY * i * 7);
      end = new Date(start.getTime() + A_DAY * 7);
      if (start <= today && end > today) {
        if (
          reports.filter(el => new Date(el.createdAt) >= start && new Date(el.createdAt) < end)
            .length >= recentChallenge.checkingPeriod
        ) return 'thisWeekWasDoIt';
      }
    }
    if (recentReportDate === new Date().toISOString().slice(0, 10)) return 'todayWasDoIt';
    return 'none';
  };

  render() {
    const { modalVisible, isLoaded } = this.state;
    const {
      recentChallenge,
      reports,
      progress,
      refreshDashboard,
    } = this.props;

    const start = new Date(recentChallenge.startAt);
    const end = new Date(recentChallenge.endAt);

    const startTime = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;
    const endTime = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`;

    if (isLoaded) {
      if (recentChallenge.state === 'inProgress') {
        return (
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
              <DoIt
                modalVisible={modalVisible}
                toggleModal={this.toggleModal}
                recentChallenge={recentChallenge}
                refreshDashboard={refreshDashboard}
              />

              <View style={{ flexDirection: 'row', flex: 4 }}>
                <View style={[styles.sloganContainer]}>
                  <View style={{ marginLeft: 20 }}>
                    <View
                      style={{
                        marginTop: 5,
                      }}
                    >
                      <Text
                        adjustsFontSizeToFit
                        allowFontScaling
                        numberOfLines={1}
                        style={styles.sloganText}
                      >
                        {recentChallenge.slogan}
                      </Text>
                      <Text style={{ marginTop: 5, color: '#d0d0d0' }}>
                        {`도전 기간 | ${startTime} - ${endTime}`}
                      </Text>
                    </View>
                    <View style={styles.statusBox}>
                      <View
                        style={{
                          flex: 1,
                          // backgroundColor: 'red',
                          alignItems: 'center',
                          marginVertical: 5,
                        }}
                      >
                        <Text style={{ color: '#888' }}>체크 주기</Text>
                        <View style={{ justifyContent: 'center', marginTop: 5 }}>
                          <Text style={{ fontSize: 25, fontWeight: '500' }}>
                            {recentChallenge.checkingPeriod}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          borderLeftWidth: 1,
                          borderRightWidth: 1,
                          borderColor: '#dcdcdc',
                          marginVertical: 5,
                        }}
                      >
                        <Text style={{ color: '#888' }}>금액</Text>
                        <View
                          style={{
                            justifyContent: 'center',
                            marginTop: 5,
                          }}
                        >
                          <Text
                            style={{ fontSize: 25, fontWeight: '500' }}
                            adjustsFontSizeToFit
                            allowFontScaling
                            numberOfLines={1}
                          >
                            5만원
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          // backgroundColor: 'pink',
                          alignItems: 'center',
                          marginVertical: 5,
                        }}
                      >
                        <Text style={{ color: '#888' }}>카테고리</Text>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5,
                          }}
                        >
                          <Text style={{ fontSize: 22, fontWeight: '500' }}>
                            {recentChallenge.category}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{}}>
                    <Text
                      style={{
                        color: '#d0d0d0',
                        marginVertical: 10,
                        marginLeft: 20,
                      }}
                    >
                      진행 상황 |
                      {' '}
                      {(progress * 100).toFixed(1)}
%
                    </Text>
                    <View style={{ marginLeft: 20 }}>
                      <Progress.Bar progress={progress} color="#ffb69b" width={width - 40} />
                    </View>
                  </View>
                </View>
              </View>
              {reports.length ? (
                <View style={styles.nonReportsTextContainer}>
                  <Carousel
                    layout="stack"
                    inverted
                    swipeThreshold={5}
                    data={reports}
                    renderItem={({ item }) => <ReportEntry data={item} />}
                    sliderWidth={width - 80}
                    itemWidth={width - 100}
                    sliderHeight={270}
                    style={{ transform: [{ scaleY: -1 }] }}
                  />
                </View>
              ) : (
                <View style={styles.nonReportsTextContainer}>
                  <Text style={{ fontSize: 15 }}>기록이 아직 없어요</Text>
                </View>
              )}
              <View style={[styles.doItContainer]}>
                {this.wasDoIt() !== 'none' ? (
                  <TouchableOpacity style={styles.blockButton}>
                    <Text style={{ color: 'white', fontSize: 17, fontWeight: '600' }}>
                      {this.wasDoIt() === 'todayWasDoIt' ? '오늘 달성 완료' : '이번주 달성 완료'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <OrangeButton text="오늘 달성" onPress={this.doItHandler} width={width - 40} />
                )}
              </View>
            </View>
          </ScrollView>
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
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
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
  refreshDashboard: PropTypes.func.isRequired,
};

export default Dashboard;
