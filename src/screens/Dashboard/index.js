import React from 'react';
import {
  Text, TouchableOpacity, Animated, View, Dimensions, ImageBackground,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from './Dashboard';
// import Select from './Select';
// import DoIt from './DoIt';

const { width, height } = Dimensions.get('window');
let isHidden = true;

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

  state = { bounceValue: new Animated.Value(0) };

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
    const { navigation } = this.props;
    navigation.setParams({
      handleBottomModal: this.toggleSubView,
    });
  };

  // hideModal = () => {
  //   this.setState({
  //     modalVisible: false,
  //   });
  // };

  // changeModalVisible = () => {
  //   this.setState({
  //     modalVisible: true,
  //   });
  // };

  render() {
    const { bounceValue } = this.state;
    return <Dashboard bounceValue={bounceValue} toggleSubView={this.toggleSubView} />;
  }
}

component.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default createStackNavigator({ component });
