import React from 'react';
import {
  Text,
  TouchableOpacity,
  Animated,
  AsyncStorage,
  ActivityIndicator,
  View,
} from 'react-native';
import { createStackNavigator, NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from './Dashboard';
import styles from './style';
import Select from './Select';
import EndChallenge from '../EndChallenge';
import sendRequest from '../../modules/sendRequest';
import UserInfo from '../UserInfo';

let isHidden = true;

class component extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <TouchableOpacity onPress={() => params.handleBottomModal()}>
          <Text style={{ fontSize: 17 }}>
            {params.dashboardTitle ? ` ${params.dashboardTitle} ` : ' 선택된 도전이 없어요 '}
            <Icon name="ios-arrow-dropdown" size={17} />
          </Text>
        </TouchableOpacity>
      ),
    };
  };

  state = {
    bounceValue: new Animated.Value(0),
    challenges: [],
    isLoaded: false,
    recentChallenge: {},
    user: null,
    reports: [],
    progress: null,
  };

  toggleSubView = async () => {
    const { bounceValue } = this.state;
    let toValue = 0;
    if (isHidden) {
      toValue = 200;
    }
    console.log(toValue);
    await Animated.spring(bounceValue, {
      toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
    }).start();
    // console.log(isHidden);
    isHidden = !isHidden;
  };

  componentDidMount = async () => {
    this.setState({ isLoaded: false });
    const { navigation } = this.props;
    navigation.setParams({
      handleBottomModal: this.toggleSubView,
    });
    this.setState({ user: JSON.parse(await AsyncStorage.getItem('userInfo')) });
    const { user } = this.state;
    if (user) {
      const response = await sendRequest(
        'get',
        `/api/challenges/getInProgressChallenges/${user.id}`,
      );
      this.setState({ challenges: response.data.challenges });
      const { challenges } = this.state; // 여기서 선언해줘야 값을 바꾼 뒤 사용가능
      const shouldChangeChallenges = [];
      challenges.forEach(el => {
        if (new Date(el.startAt) - new Date() <= 0) {
          shouldChangeChallenges.push(el.id);
        }
      });
      // challenge 시작날짜가 오늘보다 과거면 inProgress로 변경
      if (shouldChangeChallenges.length) {
        await sendRequest('put', '/api/challenges/updateChallengesState', null, {
          willState: 'inProgress',
          challengesId: shouldChangeChallenges,
        });
        // 변경되면 데이터 다시 불러오기
        const { data } = await sendRequest(
          'get',
          `/api/challenges/getInProgressChallenges/${user.id}`,
        );
        this.setState({ challenges: data.challenges });
      }
      const EndChallengeArray = challenges.filter(el => new Date(el.endAt) - new Date() <= 0);
      if (EndChallengeArray.length > 0) {
        this.setState({
          recentChallenge: EndChallengeArray[0],
        });
      } else {
        this.setState({
          recentChallenge:
            JSON.parse(await AsyncStorage.getItem('recentChallenge')) || challenges[0],
        });
      }
    }
    const { recentChallenge } = this.state; // 여기서 선언해줘야 값을 바꾼 뒤 사용가능
    if (Object.keys(recentChallenge).length) {
      const res = await sendRequest('get', `/api/reports/getReports/${recentChallenge.id}`);
      let reports = res ? res.data.reports : [];
      const shouldConfirmReportsId = [];
      reports.forEach(el => {
        if (el.isConfirmed === 'pending' && new Date() - new Date(el.createdAt) > 86400000) {
          shouldConfirmReportsId.push(el.id);
        }
      });
      // 하루지나도 심판이 소식없으면 자동 success
      if (shouldConfirmReportsId.length) {
        await sendRequest('put', '/api/reports/updateReports', null, {
          willBeConfirmed: 'true',
          reportsId: shouldConfirmReportsId,
        });
      }
      if (new Date(recentChallenge.endAt) - new Date() <= 0) {
        const pendingReportsId = [];
        reports.forEach((el, index) => {
          if (el.isConfirmed === 'pending') {
            pendingReportsId.push(el.id);
            reports[index].isConfirmed = 'true';
          }
        });
        await sendRequest('put', '/api/reports/updateReports', null, {
          willBeConfirmed: 'true',
          reportsId: pendingReportsId,
        });
      }
      reports = reports
        .filter(el => el.isConfirmed === 'true')
        .map((el, index) => ({ ...el, index: index + 1 }));
      this.setState({ reports: reports.reverse() });
      this.setState({
        progress: (await this.calculateProgress()) <= 1 ? await this.calculateProgress() : 1,
      });
      navigation.setParams({
        dashboardTitle: user ? recentChallenge.title : '선택된 도전이 없습니다',
      });
    }
    this.setState({ isLoaded: true });
  };

  handleRecentChallenge = async challenge => {
    this.setState({ isLoaded: false });
    const { user } = this.state;
    const { navigation } = this.props;
    const response = await sendRequest('get', `/api/challenges/getInProgressChallenges/${user.id}`);
    this.setState({ challenges: response.data.challenges });
    this.setState({ recentChallenge: { ...challenge } });
    const { recentChallenge } = this.state;
    const res = await sendRequest('get', `/api/reports/getReports/${recentChallenge.id}`);
    let { reports } = res && res.data;
    const shouldConfirmReportsId = [];
    // 하루지나도 심판이 소식없으면 자동 success
    reports.forEach(el => {
      if (el.isConfirmed === 'pending' && new Date() - new Date(el.createdAt) > 86400000) {
        shouldConfirmReportsId.push(el.id);
      }
    });
    if (shouldConfirmReportsId.length) {
      await sendRequest('put', '/api/reports/updateReports', null, {
        willBeConfirmed: 'true',
        reportsId: shouldConfirmReportsId,
      });
    }
    reports = reports
      .filter(el => el.isConfirmed === 'true')
      .map((el, index) => ({ ...el, index: index + 1 }));
    this.setState({ reports: reports.reverse() });
    this.setState({
      progress: (await this.calculateProgress()) <= 1 ? await this.calculateProgress() : 1,
    });
    navigation.setParams({ dashboardTitle: recentChallenge.title });
    this.setState({ isLoaded: true });
  };

  handleChallenges = challenges => {
    this.setState({ challenges });
  };

  calculateProgress = async () => {
    const { recentChallenge, reports } = this.state;
    const week = (new Date(recentChallenge.endAt) - new Date(recentChallenge.startAt)) / (86400000 * 7);
    const result = await (reports.filter(el => el.isConfirmed === 'true').length
      / (week * recentChallenge.checkingPeriod));
    return result;
  };

  renderMethod = () => {
    const {
      bounceValue,
      challenges,
      isLoaded,
      user,
      recentChallenge,
      reports,
      progress,
    } = this.state;
    if (isLoaded) {
      if (user) {
        if (challenges.length) {
          return (
            <>
              <Animated.View
                style={[styles.subView, { transform: [{ translateY: bounceValue }], zIndex: 300 }]}
              >
                <Select
                  toggleSubView={this.toggleSubView}
                  handleChallenges={this.handleChallenges}
                  challenges={challenges}
                  handleRecentChallenge={this.handleRecentChallenge}
                  recentChallenge={recentChallenge}
                />
              </Animated.View>
              {new Date(recentChallenge.endAt) - new Date() > 0 ? (
                <Dashboard
                  bounceValue={bounceValue}
                  toggleSubView={this.toggleSubView}
                  challenges={challenges}
                  recentChallenge={recentChallenge}
                  handleChallenges={this.handleChallenges}
                  handleRecentChallenge={this.handleRecentChallenge}
                  reports={reports}
                  progress={progress}
                  refreshDashboard={this.componentDidMount}
                />
              ) : (
                <EndChallenge
                  recentChallenge={recentChallenge}
                  progress={progress}
                  refreshDashboard={this.componentDidMount}
                />
              )}
            </>
          );
        }
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>새로운 도전을 시작하세요!</Text>
          </View>
        );
      }
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.goTo('SignIn')}>
              <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>
                Flint 회원이신가요?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  };

  render() {
    return (
      <>
        <NavigationEvents onWillFocus={this.componentDidMount} />
        {this.renderMethod()}
      </>
    );
  }
}

component.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default createStackNavigator({ component, UserInfo });
