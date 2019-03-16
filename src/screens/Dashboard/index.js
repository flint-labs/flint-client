import React from 'react';
import {
  Text,
  TouchableOpacity,
  Animated,
  AsyncStorage,
  ActivityIndicator,
  View,
  Easing,
} from 'react-native';
import { createStackNavigator, NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import Dashboard from './Dashboard';
import Select from './Select';
import EndChallenge from '../EndChallenge';
import sendRequest from '../../modules/sendRequest';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import { challengeAction } from '../../actions';

const { RESET_NEW_CHALLENGE } = challengeAction;

class component extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <TouchableOpacity onPress={() => params.handleBottomModal()}>
          <Text style={{ fontSize: 17 }}>
            {params.dashboardTitle
              ? ` ${params.dashboardTitle} `
              : ' 선택된 도전이 없어요 '}
            <Icon name="ios-arrow-dropdown" size={17} />
          </Text>
        </TouchableOpacity>
      ),
    };
  };

  modal = React.createRef();

  state = {
    bounceValue: new Animated.Value(0),
    challenges: [],
    isLoaded: false,
    recentChallenge: null,
    user: null,
    reports: [],
    progress: null,
    isFailure: false,
    isSuccess: false,
    isNew: false,
  };

  openmodal = () => {
    this.modal.current.open();
  };

  goTo = screen => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  componentDidMount = async () => {
    this.setState({ isLoaded: false });
    const { navigation, newChallenge, resetNewChallenge } = this.props;
    this.setState({ user: JSON.parse(await AsyncStorage.getItem('userInfo')) });
    const { user } = this.state;
    if (JSON.stringify(newChallenge) !== '{}') {
      this.setState({ recentChallenge: newChallenge, isNew: true });
      resetNewChallenge();
    }
    if (user) {
      const response = await sendRequest(
        'get',
        `/api/challenges/getInProgressChallenges/${user.id}`,
      );
      this.setState({ challenges: response.data.challenges });
      const { challenges, recentChallenge, isNew } = this.state; // 여기서 선언해줘야 값을 바꾼 뒤 사용가능
      navigation.setParams({
        handleBottomModal: challenges.length ? this.openmodal : () => {},
      });
      const successReponse = await sendRequest(
        'get',
        `/api/reports/getSuccessOneShot/${user.id}`,
      );
      if (!recentChallenge && successReponse.data.length) {
        this.setState({
          recentChallenge: successReponse.data[0].challenge,
          isSuccess: true,
        });
      }
      // ongoing인 도전이 성공이 있으면 성공으로 띄워주기
      const { isSuccess } = this.state;
      if (!isSuccess) {
        const successOnGoing = await sendRequest(
          'get',
          `/api/reports/getSuccessOnGoing/${user.id}`,
        );
        if (successOnGoing.data) {
          this.setState({
            recentChallenge: successOnGoing.data,
            isSuccess: true,
          });
        }
      }

      // 실패한 reports가 하나라도 있으면 fail
      const failureResponse = await sendRequest(
        'get',
        `/api/reports/getFailureReport/${user.id}`,
      );
      if (!isNew && failureResponse.data.length) {
        this.setState({
          recentChallenge: failureResponse.data[0].challenge,
          isFailure: true,
        });
      }
      const shouldChangeChallenges = [];
      challenges.forEach(el => {
        if (new Date(el.startAt) - new Date() <= 0) {
          shouldChangeChallenges.push(el.id);
        }
      });
      // challenge 시작날짜가 오늘보다 과거면 inProgress로 변경
      if (shouldChangeChallenges.length) {
        await sendRequest(
          'put',
          '/api/challenges/updateChallengesState',
          null,
          {
            willState: 'inProgress',
            challengesId: shouldChangeChallenges,
          },
        );
        // 변경되면 데이터 다시 불러오기
        const { data } = await sendRequest(
          'get',
          `/api/challenges/getInProgressChallenges/${user.id}`,
        );
        this.setState({ challenges: data.challenges });
      }
      const EndChallengeArray = challenges.filter(
        el => new Date(el.endAt) - new Date() <= 0,
      );
      const { isFailure } = this.state;
      if (!isNew && !isFailure && !isSuccess) {
        if (EndChallengeArray.length > 0) {
          this.setState({
            recentChallenge: EndChallengeArray[0],
          });
        } else {
          this.setState({
            recentChallenge:
              JSON.parse(await AsyncStorage.getItem('recentChallenge'))
              || challenges[0],
          });
        }
      }
    }
    const { recentChallenge } = this.state; // 여기서 선언해줘야 값을 바꾼 뒤 사용가능
    if (recentChallenge) {
      const res = await sendRequest(
        'get',
        `/api/reports/getReports/${recentChallenge.id}`,
      );
      let reports = res ? res.data.reports : [];
      const shouldConfirmReportsId = [];
      reports.forEach(el => {
        if (
          el.isConfirmed === 'pending'
          && new Date() - new Date(el.createdAt) > 86400000
        ) {
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
      reports = reports.map((el, index) => ({ ...el, index: index + 1 }));
      this.setState({ reports: reports.reverse() });
      this.setState({
        progress:
          (await this.calculateProgress()) <= 1
            ? await this.calculateProgress()
            : 1,
      });
      navigation.setParams({
        dashboardTitle: user ? recentChallenge.title : '선택된 도전이 없습니다',
      });
    } else {
      navigation.setParams({
        dashboardTitle: '선택된 도전이 없습니다',
      });
    }
    this.setState({ isLoaded: true });
  };

  handleRecentChallenge = async challenge => {
    this.setState({ isLoaded: false });
    const { user } = this.state;
    const { navigation } = this.props;
    const response = await sendRequest(
      'get',
      `/api/challenges/getInProgressChallenges/${user.id}`,
    );
    this.setState({ challenges: response.data.challenges });
    this.setState({ recentChallenge: { ...challenge } });
    const { recentChallenge } = this.state;
    const res = await sendRequest(
      'get',
      `/api/reports/getReports/${recentChallenge.id}`,
    );
    let { reports } = res && res.data;
    const shouldConfirmReportsId = [];
    // 하루지나도 심판이 소식없으면 자동 success
    reports.forEach(el => {
      if (
        el.isConfirmed === 'pending'
        && new Date() - new Date(el.createdAt) > 86400000
      ) {
        shouldConfirmReportsId.push(el.id);
      }
    });
    if (shouldConfirmReportsId.length) {
      await sendRequest('put', '/api/reports/updateReports', null, {
        willBeConfirmed: 'true',
        reportsId: shouldConfirmReportsId,
      });
    }
    reports = reports.map((el, index) => ({ ...el, index: index + 1 }));
    this.setState({ reports: reports.reverse() });
    this.setState({
      progress:
        (await this.calculateProgress()) <= 1
          ? await this.calculateProgress()
          : 1,
    });
    navigation.setParams({ dashboardTitle: recentChallenge.title });
    this.setState({ isLoaded: true });
  };

  componentBlur = () => {
    // this.setState({ recentChallenge: null });
  }

  handleChallenges = challenges => {
    this.setState({ challenges });
  };

  calculateProgress = async () => {
    const { recentChallenge, reports } = this.state;
    if (recentChallenge.isOnGoing) {
      const week = (new Date(recentChallenge.endAt) - new Date(recentChallenge.startAt))
        / (86400000 * 7);
      const result = await (reports.filter(el => el.isConfirmed === 'true')
        .length
        / (week * recentChallenge.checkingPeriod));
      return result;
    }
    const confirmReport = reports.filter(el => el.isConfirmed === 'true');
    if (confirmReport.length) return 1;
    return 0;
  };

  handleIsFailure = () => {
    this.setState({
      isFailure: false,
    });
  };

  handleIsSuccess = () => {
    this.setState({
      isSuccess: false,
    });
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
      isFailure,
      isSuccess,
    } = this.state;
    const { navigation } = this.props;
    if (isLoaded) {
      if (user) {
        if (challenges.length) {
          return (
            <>
              <Modal
                style={{
                  height: 300,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
                entry="bottom"
                position="bottom"
                ref={this.modal}
                easing={Easing.elastic(0)}
              >
                <View style={{ height: 30, alignItems: 'center' }}>
                  <Icon name="ios-remove" size={50} color="#aaa" />
                </View>
                <Select
                  handleChallenges={this.handleChallenges}
                  challenges={challenges}
                  handleRecentChallenge={this.handleRecentChallenge}
                  recentChallenge={recentChallenge}
                />
              </Modal>
              {new Date(recentChallenge.endAt) - new Date() > 0
              && !isFailure
              && !isSuccess ? (
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Dashboard
                    bounceValue={bounceValue}
                    challenges={challenges}
                    recentChallenge={recentChallenge}
                    handleChallenges={this.handleChallenges}
                    handleRecentChallenge={this.handleRecentChallenge}
                    reports={reports}
                    progress={progress}
                    refreshDashboard={this.componentDidMount}
                  />
                </View>
                ) : (
                  <EndChallenge
                    recentChallenge={recentChallenge}
                    progress={progress}
                    refreshDashboard={this.componentDidMount}
                    handleIsFailure={this.handleIsFailure}
                    isFailure={isFailure}
                    handleIsSuccess={this.handleIsSuccess}
                    isSuccess={isSuccess}
                  />
                )}
            </>
          );
        }
        return (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  fontSize: 15,
                  fontWeight: '500',
                }}
              >
                새로운 도전 시작하기
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableOpacity onPress={() => this.goTo('SignIn')}>
            <Text
              style={{ fontWeight: '500', textDecorationLine: 'underline' }}
            >
              로그인 하러가기
            </Text>
          </TouchableOpacity>
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
        <NavigationEvents
          onWillFocus={this.componentDidMount}
          onDidBlur={this.componentBlur}
        />
        {this.renderMethod()}
      </>
    );
  }
}

component.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  newChallenge: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  resetNewChallenge: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  newChallenge: state.challenge.newChallenge,
});

const mapDispatchToProps = dispatch => ({
  resetNewChallenge: () => dispatch({ type: RESET_NEW_CHALLENGE }),
});

export default createStackNavigator(
  {
    component: { screen: connect(mapStateToProps, mapDispatchToProps)(component) },
    SignIn,
    SignUp: {
      screen: SignUp,
    },
  },
  {
    navigationOptions: ({ navigation: { state } }) => ({
      tabBarVisible: !(state.index > 0),
    }),
  },
);
