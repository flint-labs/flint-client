import React, { Component } from 'react';
import {
  View, Text, SafeAreaView, Image, AsyncStorage,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './style';
import { OrangeButton } from '../../components';
import sendRequest from '../../modules/sendRequest';
import { challengeAction } from '../../actions';

const { RESET_CHALLENGE, SET_NEW_CHALLENGE } = challengeAction;
const KAKAO_PAY_ICON = require('../../../assets/images/ChallengeSetting/kakao-icon.png');
const PAYPAL_ICON = require('../../../assets/images/ChallengeSetting/paypal-icon.png');

class PaymentMethod extends Component {
  state = {
    isKakao: false,
  }

  makeChallenge = async () => {
    const { challenge } = this.props;
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
      receipient_charity_id: challenge.receipient,
      receipient_user_id: null,
      description: 'undefined',
    };
  };

  handleNext = async () => {
    const { isKakao } = this.state;
    const {
      navigation, amount, resetChallenge, setNewChallenge,
    } = this.props;
    const challenge = await this.makeChallenge();
    const { data } = await sendRequest('post', '/api/challenges/setting', null, { challenge });

    resetChallenge();
    setNewChallenge(data);

    navigation.navigate('Payment', {
      setting: navigation.state.params.setting,
      amount,
      isKakao,
      challengeId: data.id,
    });
  }

  render = () => {
    const { isKakao } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 20 }}>결제수단을 선택해주세요</Text>
          </View>
          <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.paymentMethodBox}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={KAKAO_PAY_ICON}
                  style={styles.paymentIcon}
                />
                <CheckBox
                  title="Kakao Pay"
                  checked={isKakao}
                  onPress={() => this.setState({ isKakao: true })}
                />
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={PAYPAL_ICON}
                  style={styles.paymentIcon}
                />
                <CheckBox
                  title="Paypal"
                  checked={!isKakao}
                  onPress={() => this.setState({ isKakao: false })}
                />
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

PaymentMethod.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  amount: PropTypes.string.isRequired,
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
  resetChallenge: PropTypes.func.isRequired,
  setNewChallenge: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    amount: state.challenge.amount,
    challenge: state.challenge,
  }),
  dispatch => ({
    resetChallenge: () => dispatch({ type: RESET_CHALLENGE }),
    setNewChallenge: newChallenge => dispatch({
      type: SET_NEW_CHALLENGE, payload: { newChallenge },
    }),
  }),
)(PaymentMethod);
