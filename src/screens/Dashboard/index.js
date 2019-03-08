import React from 'react';
import {
  Text, TouchableOpacity, Animated, AsyncStorage,
} from 'react-native';
import { createStackNavigator, NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Dashboard from './Dashboard';
import styles from './style';
import Select from './Select';
import EndChallenge from '../EndChallenge';

let isHidden = true;
const baseUrl = 'http://13.209.19.196:3000';

class component extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <TouchableOpacity onPress={() => params.handleBottomModal()}>
          <Text style={{ fontSize: 20 }}>
            {params.dashboardTitle ? ` ${params.dashboardTitle} ` : ' 선택된 도전이 없어요 '}
            <Icon name="ios-arrow-dropdown" size={20} />
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
      const response = await axios // await 사용해야 밑에서 challenges 사용가능
        .get(`${baseUrl}/api/challenges/getInProgressChallenges/${user.id}`);
      this.setState({ challenges: response.data.challenges });
      const { challenges } = this.state; // 여기서 선언해줘야 값을 바꾼 뒤 사용가능
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
    if (recentChallenge) {
      const res = await axios.get(
        `${baseUrl}/api/reports/getNotPendingReports/${recentChallenge.id}`,
      );
      let { reports } = res && res.data;
      if (new Date(recentChallenge.endAt) - new Date() <= 0) {
        reports = reports.map(el => {
          if (el.isConfirmed === 'pending') {
            return { ...el, isConfirmed: 'true' };
          }
          return { ...el };
        });
        // axios.put(' update 요청');
      }
      reports = reports.map((el, index) => ({ ...el, index: index + 1 }));
      this.setState({ reports: reports.reverse() });
      this.setState({
        progress: (await this.calculateProgress()) <= 1 ? await this.calculateProgress() : 1,
      });
      navigation.setParams({
        dashboardTitle: recentChallenge.title,
      });
    }
    this.setState({ isLoaded: true });
  };

  handleRecentChallenge = async challenge => {
    this.setState({ isLoaded: false });
    const { user } = this.state;
    const { navigation } = this.props;
    const res = await axios // await 사용해야 밑에서 challenges 사용가능
      .get(`${baseUrl}/api/challenges/getInProgressChallenges/${user.id}`);
    this.setState({ challenges: res.data.challenges });
    this.setState({ recentChallenge: { ...challenge } });
    const { recentChallenge } = this.state;
    const response = await axios.get(
      `${baseUrl}/api/reports/getNotPendingReports/${recentChallenge.id}`,
    );
    let { reports } = response.data;
    reports = reports.map((el, index) => ({ ...el, index: index + 1 }));
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
        return <Text>새로운 도전을 시작하세요!</Text>;
      }
      return <Text>로그인을 먼저 해주세요</Text>;
    }
    return <Text>Loading</Text>;
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

export default createStackNavigator({ component });
