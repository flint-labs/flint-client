import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './style';
import { OrangeButton } from '../../components';
import { challengeAction } from '../../actions';

const { SET_IS_ONGOING } = challengeAction;

const IsOnGoing = ({ navigation, isOnGoing, setIsOnGoing }) => {
  const handleNext = () => {
    navigation.navigate('Title', {
      setting: navigation.state.params.setting,
    });
  };

  const renderChallengeType = () => {
    if (isOnGoing) {
      return (
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          {'꾸준한 도전입니다.\n ex) 매일 30분씩 운동하기'}
        </Text>
      );
    }
    return (
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
        {'한번에 이룰 수 있는 도전입니다.\n ex) 3월 중에 대청소 하기'}
      </Text>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>어떤 종류의 도전인가요?</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center' }}>
          <View style={styles.pickerBox}>
            <CheckBox
              title="On Going!"
              checked={isOnGoing}
              onPress={() => setIsOnGoing(true)}
            />
            <CheckBox
              title="One Shot!"
              checked={!isOnGoing}
              onPress={() => setIsOnGoing(false)}
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            {renderChallengeType()}
          </View>
        </View>
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
  isOnGoing: PropTypes.bool.isRequired,
  setIsOnGoing: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    isOnGoing: state.challenge.isOnGoing,
  }),
  dispatch => ({
    setIsOnGoing: isOnGoing => dispatch({ type: SET_IS_ONGOING, payload: { isOnGoing } }),
  }),
)(IsOnGoing);
