import React from 'react';
import {
  View, Text, AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OrangeButton } from '../../components';
import sendRequest from '../../modules/sendRequest';

const StartChallenge = ({ navigation, challenge }) => {
  const makeChallenge = async () => {
    const { startAt, challengePeriod } = challenge;
    const { id } = JSON.parse(await AsyncStorage.getItem('userInfo'));

    const endAt = new Date(startAt.getTime() + 604800000 * challengePeriod);
    const state = startAt.getTime() - Date.now() > 0 ? 'pending' : 'inProgress';

    return {
      category: challenge.category,
      title: challenge.title,
      userId: id,
      startAt,
      endAt,
      state,
      isOnGoing: challenge.isOnGoing,
      slogan: challenge.slogan,
      referee: challenge.referee,
      checkingPeriod: Number(challenge.checkingPeriod),
      amount: Number(challenge.amount.split(',').join('')),
      receipient_charity_id: null,
      receipient_user_id: null,
      description: 'undefined',
    };
  };

  const handleSubmit = async () => {
    try {
      const newChallenge = await makeChallenge();
      await sendRequest('post', '/api/challenges/setting', null, { challenge: newChallenge });

      navigation.state.params.setting();
      navigation.popToTop();
    } catch (error) {
      console.log(error.response);
    }
  };


  return (
    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text style={{ fontSize: 20 }}>Challenge Your Life</Text>
      </View>
      <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }} />
      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
        <OrangeButton
          text="Submit"
          onPress={handleSubmit}
          marginTop={0}
        />
      </View>
    </View>
  );
};

StartChallenge.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  challenge: PropTypes.shape({
    isOnGoing: PropTypes.bool,
    title: PropTypes.string,
    challengePeriod: PropTypes.string,
    startAt: PropTypes.instanceOf(Date),
    referee: PropTypes.string,
    checkingPeriod: PropTypes.string,
    amount: PropTypes.string,
    receipient: PropTypes.number,
    slogan: PropTypes.string,
  }).isRequired,
};

export default connect(
  state => ({
    challenge: state.challenge,
  }),
)(StartChallenge);
