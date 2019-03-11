import React from 'react';
import {
  View, Text, SafeAreaView, Picker, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OrangeButton } from '../../components';
import { challengeAction } from '../../actions';
import styles from './style';
import { reapeat } from '../../modules/util';

const { SET_CHALLENGE_PERIOD } = challengeAction;
const { width } = Dimensions.get('window');

const IsOnGoing = ({ navigation, challengePeriod, setChallengePeriod }) => {
  const handleNext = () => {
    navigation.navigate('Title');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }} />
        </View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }} />
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OrangeButton text="Next" onPress={handleNext} marginTop={0} />
        </View>
      </View>
    </SafeAreaView>
  );
};

IsOnGoing.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  challengePeriod: PropTypes.number.isRequired,
  setChallengePeriod: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    challengePeriod: state.challenge.challengePeriod,
  }),
  dispatch => ({
    setChallengePeriod: challengePeriod => {
      dispatch({ type: SET_CHALLENGE_PERIOD, payload: { challengePeriod } });
    },
  }),
)(IsOnGoing);
