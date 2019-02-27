import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from './Dashboard';
import Select from './Select';
// import DoIt from './DoIt';

class component extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <TouchableOpacity onPress={() => params.handleModal()}>
          <Text style={{ fontSize: 20 }}>
            {'제목 '}
            <Icon name="ios-arrow-dropdown" size={20} />
          </Text>
        </TouchableOpacity>
      ),
    };
  };

  state = { modalVisible: false };

  componentDidMount = () => {
    const { navigation } = this.props;
    navigation.setParams({
      handleModal: this.changeModalVisible,
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  changeModalVisible = () => {
    this.setState({
      modalVisible: true,
    });
  };

  render() {
    const { modalVisible } = this.state;
    return modalVisible ? <Select hideModal={this.hideModal} /> : <Dashboard />;
  }
}

component.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default createStackNavigator({ component });
