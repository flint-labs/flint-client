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

const ChallengePeriod = ({ navigation, challengePeriod, setChallengePeriod }) => {
  const handleNext = () => {
    navigation.navigate('Mode', {
      setting: navigation.state.params.setting,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>몇 주 동안 하실래요?</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.pickerBox}>

            <Picker
              selectedValue={challengePeriod}
              style={{ width: width * 0.2 }}
              onValueChange={period => setChallengePeriod(period)}
            >
              {reapeat(24, (el, index) => {
                const value = (index + 1).toString();
                return <Picker.Item key={value} label={value} value={value} />;
              })}
            </Picker>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '500' }}> weeks</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OrangeButton text="Next" onPress={handleNext} marginTop={0} />
        </View>
      </View>
    </SafeAreaView>
  );
};

ChallengePeriod.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  challengePeriod: PropTypes.string.isRequired,
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
)(ChallengePeriod);
