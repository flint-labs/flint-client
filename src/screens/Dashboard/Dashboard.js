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
import sendRequest from '../../modules/sendRequest';

const { width } = Dimensions.get('window');
// const runIcon = require('../../../assets/images/Dashboard/run.png');
const readyRun2Image = require('../../../assets/images/Dashboard/readyRun2.png');

class Dashboard extends Component {
  state = {
    modalVisible: false,
    isLoaded: false,
    refereeNickname: '',
  };

  componentDidMount = async () => {
    const { recentChallenge } = this.props;

    try {
      const {
        data: { user },
      } = await sendRequest('get', `/api/users/${recentChallenge.refereeId}`);

      this.setState({ refereeNickname: user.nickname });
    } catch (err) {
      console.log('err');
    }

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
          reports.filter(
            el =>
              new Date(el.createdAt) >= start && new Date(el.createdAt) < end,
          ).length >= recentChallenge.checkingPeriod
        ) {
          return 'thisWeekWasDoIt';
        }
      }
    }
    if (recentReportDate === new Date().toISOString().slice(0, 10)) {
      return 'todayWasDoIt';
    }
    return 'none';
  };

  render() {
    const { modalVisible, isLoaded } = this.state;
    const { recentChallenge, reports, progress, refreshDashboard } = this.props;
    const start = new Date(recentChallenge.startAt);
    const end = new Date(recentChallenge.endAt);

    const startTime = start.toLocaleString('ko-kr').slice(0, 12);
    const endTime = end.toLocaleString('ko-kr').slice(0, 12);

    const amountHigh = parseInt(recentChallenge.amount / 10000);
    const amountLow = parseInt((recentChallenge.amount % 10000) / 1000);

    let viewAmount = '의지';

    if (amountHigh !== 0 && amountLow === 0) {
      viewAmount = `${amountHigh}만원`;
    } else if (amountHigh !== 0 && amountLow !== 0) {
      viewAmount = `${amountHigh}.${amountLow}만원`;
    } else if (amountLow !== 0) {
      viewAmount = `${amountLow}천원`;
    }

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
                      <Text style={{ marginTop: 5, color: '#999' }}>
                        {`도전 기간 | ${startTime} - ${endTime}`}
                      </Text>
                    </View>
                    <View style={styles.statusBox}>
                      <View style={styles.statusEntry}>
                        <Text style={{ color: '#888' }}>체크 횟수</Text>

                        {recentChallenge.isOnGoing ? (
                          <View
                            style={{ justifyContent: 'center', marginTop: 5 }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Text style={{ fontSize: 23, fontWeight: '500' }}>
                                {recentChallenge.checkingPeriod}
                              </Text>
                              <Text style={{ fontSize: 22, color: '#ccc' }}>
                                /
                              </Text>
                              <Text style={{ fontSize: 15, color: '#aaa' }}>
                                주
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 10,
                            }}
                          >
                            <Text style={{ fontSize: 17, fontWeight: '500' }}>
                              One Shot
                            </Text>
                          </View>
                        )}
                      </View>

                      <View
                        style={[
                          styles.statusEntry,
                          {
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderColor: '#dcdcdc',
                          },
                        ]}
                      >
                        <Text style={{ color: '#888' }}>금액</Text>
                        <View style={styles.statusEntryBody}>
                          <Text
                            style={{ fontSize: 20, fontWeight: '500' }}
                            adjustsFontSizeToFit
                            allowFontScaling
                            numberOfLines={1}
                          >
                            {viewAmount}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.statusEntry}>
                        <Text style={{ color: '#888' }}>카테고리</Text>
                        <View style={styles.statusEntryBody}>
                          <Text style={{ fontSize: 20, fontWeight: '500' }}>
                            {recentChallenge.category}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {recentChallenge.refereeId !== recentChallenge.userId ? (
                    <View style={styles.refereeBox}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, color: '#333' }}>
                          {this.state.refereeNickname}
                        </Text>
                        <Text style={{ color: '#999' }}> 님이 심판입니다.</Text>
                      </View>
                    </View>
                  ) : (
                    <View />
                  )}

                  <View style={{}}>
                    <Text
                      style={{
                        color: '#999',
                        marginVertical: 10,
                        marginLeft: 20,
                      }}
                    >
                      진행 상황 | {(progress * 100).toFixed(1)}%
                    </Text>
                    <View style={{ marginLeft: 20 }}>
                      <Progress.Bar
                        progress={progress}
                        color="#FF6600"
                        width={width - 40}
                      />
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
                    sliderWidth={width - 20}
                    itemWidth={width - 50}
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
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 17,
                        fontWeight: '600',
                      }}
                    >
                      {this.wasDoIt() === 'todayWasDoIt'
                        ? '오늘 달성'
                        : '이번주 달성'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <OrangeButton
                    text="기록 남기기"
                    onPress={this.doItHandler}
                    width={width - 40}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        );
      }
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
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
          <Text style={{ fontSize: 20, flex: 1 }}>
            아직 시작되지 않은 도전입니다
          </Text>
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
