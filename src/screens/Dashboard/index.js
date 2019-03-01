import React from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
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
            {'제목 '}
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

  componentDidMount = () => {
    axios
      .get(`${baseUrl}/api/challenges/getInProgressChallenges/1`)
      .then((res) => {
        this.setState({ challenges: res.data.challenges, isLoaded: true });
      })
      .catch(err => console.log(err));
    const { navigation } = this.props;
    navigation.setParams({
      handleBottomModal: this.toggleSubView,
    });
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
