import React, { Component } from 'react';
import {
  View, Text, SafeAreaView, Picker, Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { OrangeButton } from '../../components';
import { challengeAction } from '../../actions';

const { SET_RECEIPIENT } = challengeAction;
const { width } = Dimensions.get('window');

class Receipient extends Component {
  state = {
    charities: [],
  }

  componentDidMount = async () => {
    try {
      const { data } = await axios.get('http://13.209.19.196:3000/api/challenges/charities');
      this.setState({ charities: data });
    } catch (error) {
      throw error;
    }
  }

  handleNext = () => {
    const { navigation } = this.props;
    navigation.navigate('Slogan', {
      setting: navigation.state.params.setting,
    });
  };

  render = () => {
    const { charities } = this.state;
    const { receipient, setReceipient } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
          enableAutomaticScroll
          extraHeight={235}
          innerRef={ref => { this.scroll = ref; }}
        >
          <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 20 }}>만약 실패한다면 누구에게 보낼까요?</Text>
            </View>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ alignItems: 'center' }}>
                <Picker
                  selectedValue={receipient}
                  style={{ width: width * 0.7 }}
                  onValueChange={value => setReceipient(value)}
                >
                  {charities.map(value => (
                    <Picker.Item
                      key={value.name}
                      label={value.name}
                      value={value.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
              <OrangeButton text="Next" onPress={this.handleNext} marginTop={0} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

Receipient.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  receipient: PropTypes.number.isRequired,
  setReceipient: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    receipient: state.challenge.receipient,
  }),
  dispatch => ({
    setReceipient: receipient => dispatch({ type: SET_RECEIPIENT, payload: { receipient } }),
  }),
)(Receipient);
