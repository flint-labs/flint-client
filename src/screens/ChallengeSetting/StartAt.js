import React, { Component } from 'react';
import {
  View, Text, SafeAreaView, Picker, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OrangeButton } from '../../components';
import { challengeAction } from '../../actions';
import styles from './style';
import { reapeat } from '../../modules/util';

const { SET_START_AT } = challengeAction;
const { width } = Dimensions.get('window');
const THIS_YEAR = new Date().getFullYear();
const THIS_MONTH = new Date().getMonth() + 1;
const TODAY = new Date().getDate();

class StartAt extends Component {
  state = {
    startYear: THIS_YEAR,
    startMonth: THIS_MONTH,
    startDay: TODAY,
  }

  handleNext = () => {
    const { startYear, startMonth, startDay } = this.state;
    const { navigation, setStartAt } = this.props;
    const startAt = new Date(startYear, startMonth - 1, startDay);
    setStartAt(startAt);
    navigation.navigate('Mode', {
      setting: navigation.state.params.setting,
    });
  };

  render = () => {
    const { startYear, startMonth, startDay } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 20 }}>언제부터 시작할까요?</Text>
          </View>
          <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>

            <View style={styles.pickerBox}>
              <Picker
                selectedValue={startYear}
                style={{ width: width * 0.2 }}
                onValueChange={itemValue => this.setState({ startYear: itemValue })}
              >
                {reapeat(2, (el, index) => {
                  const value = (THIS_YEAR + index).toString();
                  return <Picker.Item key={value} label={value} value={value} />;
                })}
              </Picker>
              <View>
                <Text style={{ fontSize: 20, fontWeight: '500' }}> 년</Text>
              </View>
              <Picker
                selectedValue={startMonth}
                style={{ width: width * 0.2 }}
                onValueChange={itemValue => this.setState({ startMonth: itemValue })}
              >
                {reapeat(12, (el, index) => {
                  const value = (index + 1).toString();
                  return <Picker.Item key={value} label={value} value={value} />;
                })}
              </Picker>

              <View>
                <Text style={{ fontSize: 20, fontWeight: '500' }}> 월</Text>
              </View>

              <Picker
                selectedValue={startDay}
                style={{ width: width * 0.2 }}
                onValueChange={itemValue => this.setState({ startDay: itemValue })}
              >
                {reapeat(30, (el, index) => {
                  const value = (index + 1).toString();
                  return <Picker.Item key={value} label={value} value={value} />;
                })}
              </Picker>

              <View>
                <Text style={{ fontSize: 20, fontWeight: '500' }}> 일</Text>
              </View>
            </View>

          </View>
          <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
            <OrangeButton text="Next" onPress={this.handleNext} marginTop={0} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

StartAt.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  setStartAt: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    setStartAt: startAt => {
      dispatch({ type: SET_START_AT, payload: { startAt } });
    },
  }),
)(StartAt);
