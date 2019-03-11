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

const { SET_CHECKING_PERIOD } = challengeAction;
const { width } = Dimensions.get('window');

const CheckingPeriod = ({ navigation, checkingPeriod, setCheckingPeriod }) => {
  const handleNext = () => {
    navigation.navigate('Amount', {
      setting: navigation.state.params.setting,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>일주일에 몇 번 체크할까요?</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>

          <View style={styles.pickerBox}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '500' }}>주 </Text>
            </View>
            <Picker
              selectedValue={checkingPeriod}
              style={{ width: width * 0.3 }}
              onValueChange={setCheckingPeriod}
            >
              {reapeat(7, (el, index) => {
                const value = (index + 1).toString();
                return <Picker.Item key={value} label={value} value={value} />;
              })}
            </Picker>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '500' }}> 회</Text>
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

CheckingPeriod.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  checkingPeriod: PropTypes.string.isRequired,
  setCheckingPeriod: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    checkingPeriod: state.challenge.checkingPeriod,
  }),
  dispatch => ({
    setCheckingPeriod: checkingPeriod => {
      dispatch({ type: SET_CHECKING_PERIOD, payload: { checkingPeriod } });
    },
  }),
)(CheckingPeriod);
