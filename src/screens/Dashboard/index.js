import React from 'react';
import { Text, TouchableOpacity, Animated, AsyncStorage } from 'react-native';
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
    console.log(isHidden);
    isHidden = !isHidden;
  };

  componentDidMount = async () => {
    // await AsyncStorage.removeItem('recentChallenge');
    await axios // await 사용해야 밑에서 challenges 사용가능
      .get(`${baseUrl}/api/challenges/getInProgressChallenges/1`)
      .then(async res =>
        this.setState({ challenges: res.data.challenges, isLoaded: true }),
      )
      .catch(err => console.log(err));
    const { navigation } = this.props;
    const { challenges } = this.state; // 여기서 선언해줘야 값을 바꾼 뒤 사용가능
    await this.setState({
      recentChallenge:
        JSON.parse(await AsyncStorage.getItem('recentChallenge')) ||
        challenges[0],
    });
    const { recentChallenge } = this.state; // 여기서 선언해줘야 값을 바꾼 뒤 사용가능
    navigation.setParams({
      handleBottomModal: this.toggleSubView,
      dashboardTitle: recentChallenge.title,
    });
  };

  handleDashboardTitle = title => {
    const { navigation } = this.props;
    navigation.setParams({ dashboardTitle: title });
  };

  handleChallenges = challenges => {
    this.setState({ challenges });
  };

  render() {
    console.log('여기까지 옴');
    const { bounceValue, challenges, isLoaded } = this.state;
    if (isLoaded) {
      return challenges.length ? (
        <Dashboard
          bounceValue={bounceValue}
          toggleSubView={this.toggleSubView}
          challenges={challenges}
          handleChallenges={this.handleChallenges}
          handleDashboardTitle={this.handleDashboardTitle}
        />
      ) : (
        <Text>새로운 도전을 시작하세요!</Text>
      );
    }
    return <Text>Loading</Text>;
  }
}

component.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default createStackNavigator({ component });
