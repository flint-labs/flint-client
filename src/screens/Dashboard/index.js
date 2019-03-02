import React from 'react';
import {
  Text, TouchableOpacity, Animated, AsyncStorage,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Dashboard from './Dashboard';
// import Select from './Select';
// import DoIt from './DoIt';

let isHidden = true;
// const { width, height } = Dimensions.get('window');
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

  state = { bounceValue: new Animated.Value(0), challenges: null, isLoaded: false };

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
    await AsyncStorage.removeItem('recentChallenge');
    axios
      .get(`${baseUrl}/api/challenges/getInProgressChallenges/1`)
      .then(async (res) => {
        this.setState({ challenges: res.data.challenges, isLoaded: true });
        const { navigation } = this.props;
        console.log(res.data.challenges[0]);
        navigation.setParams({
          handleBottomModal: this.toggleSubView,
          dashboardTitle: JSON.parse(await AsyncStorage.getItem('recentChallenge'))
            ? JSON.parse(await AsyncStorage.getItem('recentChallenge')).title
            : res.data.challenges[0].title,
        });
      })
      .catch(err => console.log(err));
    console.log(this.state.challenges);
  };

  handleDashboardTitle = (title) => {
    const { navigation } = this.props;
    navigation.setParams({ dashboardTitle: title });
  };

  handleChallenges = (challenges) => {
    this.setState({ challenges });
  };

  render() {
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
