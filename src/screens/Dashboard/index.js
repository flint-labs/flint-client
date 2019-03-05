import React from 'react';
import {
  Text, TouchableOpacity, Animated, AsyncStorage,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Dashboard from './Dashboard';

let isHidden = true;
const baseUrl = 'http://13.209.19.196:3000';

class component extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <TouchableOpacity onPress={() => params.handleBottomModal()}>
          <Text style={{ fontSize: 20 }}>
            {params.dashboardTitle ? `${params.dashboardTitle} ` : ' '}
            <Icon name="ios-arrow-dropdown" size={20} />
          </Text>
        </TouchableOpacity>
      ),
    };
  };

  state = {
    bounceValue: new Animated.Value(0),
    challenges: null,
    isLoaded: false,
    recentChallenge: null,
    user: null,
    reports: null,
    progress: null,
  };

  toggleSubView = () => {
    const { bounceValue } = this.state;
    let toValue = 0;
    if (isHidden) {
      toValue = 200;
    }
    Animated.spring(bounceValue, {
      toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
    }).start();
    // console.log(isHidden);
    isHidden = !isHidden;
  };

  componentDidMount = async () => {
    this.setState({ user: JSON.parse(await AsyncStorage.getItem('userInfo')) });
    // await AsyncStorage.removeItem('recentChallenge');
    const { user } = this.state;
    const response = await axios // await 사용해야 밑에서 challenges 사용가능
      .get(`${baseUrl}/api/challenges/getInProgressChallenges/${user.id}`);
    this.setState({ challenges: response.data.challenges });
    const { navigation } = this.props;
    const { challenges } = this.state; // 여기서 선언해줘야 값을 바꾼 뒤 사용가능
    this.setState({
      recentChallenge: JSON.parse(await AsyncStorage.getItem('recentChallenge')) || challenges[0],
    });
    const { recentChallenge } = this.state; // 여기서 선언해줘야 값을 바꾼 뒤 사용가능
    const res = await axios.get(
      `${baseUrl}/api/reports/getNotPendingReports/${recentChallenge.id}`,
    );
    this.setState({ reports: res.data.reports });
    this.setState({ progress: await this.calculateProgress() });
    navigation.setParams({
      handleBottomModal: this.toggleSubView,
      dashboardTitle: recentChallenge.title,
    });
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
    this.setState({ reports: response.data.reports });
    this.setState({ progress: await this.calculateProgress() });
    navigation.setParams({ dashboardTitle: recentChallenge.title });
    this.setState({ isLoaded: true });
  };

  handleChallenges = challenges => {
    this.setState({ challenges });
  };

  calculateProgress = async () => {
    const { recentChallenge, reports } = this.state;
    const week = (new Date(recentChallenge.endAt) - new Date(recentChallenge.startAt)) / (86400000 * 7);
    const result = await (reports.filter(el => el.isConfirmed === '1').length
      / (week * recentChallenge.checkingPeriod));
    return result;
  };

  render() {
    const {
      bounceValue,
      challenges,
      isLoaded,
      user,
      recentChallenge,
      reports,
      progress,
    } = this.state;
    if (user) {
      if (isLoaded) {
        return challenges.length ? (
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
          <Text>새로운 도전을 시작하세요!</Text>
        );
      }
      return <Text>Loading</Text>;
    }
    return <Text>로그인을 먼저 해주세요</Text>;
  }
}

component.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default createStackNavigator({ component });
