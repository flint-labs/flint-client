import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import { OrangeButton } from '../../components';
import { challengeAction } from '../../actions';

const { SET_START_AT } = challengeAction;
const TODAY = new Date();
const AFTER_A_MONTH = () => {
  const newDate = new Date();
  newDate.setMonth(TODAY.getMonth() + 1);
  return newDate;
};

class StartAt extends Component {
  handleNext = () => {
    const { navigation } = this.props;
    navigation.navigate('ChallengePeriod', {
      setting: navigation.state.params.setting,
    });
  };

  render = () => {
    const { startAt, setStartAt } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>언제부터 시작할까요?</Text>
          </View>
          <View style={{ flex: 4, justifyContent: 'flex-start', alignItems: 'center' }}>

            <Calendar
              monthFormat="yyyy년 MM월"
              minDate={TODAY}
              maxDate={AFTER_A_MONTH()}
              onDayPress={day => setStartAt(new Date(day.dateString))}
              markedDates={{
                [startAt.toISOString().slice(0, 10)]: { selected: true },
              }}
            />

          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
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
  startAt: PropTypes.instanceOf(Date).isRequired,
  setStartAt: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    startAt: state.challenge.startAt,
  }),
  dispatch => ({
    setStartAt: startAt => {
      dispatch({ type: SET_START_AT, payload: { startAt } });
    },
  }),
)(StartAt);
