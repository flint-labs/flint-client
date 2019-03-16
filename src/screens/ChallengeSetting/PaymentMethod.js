import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  AsyncStorage,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './style';
import { OrangeButton } from '../../components';
import sendRequest from '../../modules/sendRequest';
import { challengeAction } from '../../actions';

const { RESET_CHALLENGE, SET_NEW_CHALLENGE } = challengeAction;
const KAKAO_PAY_ICON = require('../../../assets/images/ChallengeSetting/kakao-icon.png');
const PAYPAL_ICON = require('../../../assets/images/ChallengeSetting/paypal-icon.jpg');

class PaymentMethod extends Component {
  state = {
    isKakao: false,
    isPaypal: false,
    warn: false,
  };

  componentDidUpdate = () => {
    const { isKakao, isPaypal, warn } = this.state;
    if ((isKakao || isPaypal) && warn) this.setState({ warn: false });
  };

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
      week: Number(challengePeriod),
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
    const { isKakao, isPaypal } = this.state;
    if (!isKakao && !isPaypal) {
      this.setState({ warn: true });
    } else {
      const {
        navigation,
        amount,
        resetChallenge,
        setNewChallenge,
      } = this.props;
      const challenge = await this.makeChallenge();
      const { data } = await sendRequest(
        'post',
        '/api/challenges/setting',
        null,
        { challenge },
      );

      resetChallenge();
      setNewChallenge(data);

      navigation.navigate('Payment', {
        setting: navigation.state.params.setting,
        amount,
        isKakao,
        challengeId: data.id,
      });
    }
  };

  iconStyle = flag =>
    flag
      ? {
          ...styles.paymentIcon,
          shadowOffset: { width: 0, height: 1.5 },
          shadowColor: '#47C83E',
          shadowOpacity: 0.6,
          elevation: 1,
        }
      : styles.paymentIcon;

  renderCheck = () => (
    <View
      style={{
        width: 110,
        borderRadius: 30,
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <Image source={CHECK_ICON} style={{ width: 50, height: 50 }} /> */}
    </View>
  );

  render = () => {
    const { isKakao, isPaypal, warn } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
        >
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Text style={{ fontSize: 20 }}>결제수단을 선택해주세요</Text>
          </View>
          <View
            style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={styles.paymentMethodBox}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({ isKakao: true, isPaypal: false })
                }
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <ImageBackground
                  source={KAKAO_PAY_ICON}
                  style={styles.paymentIcon}
                  imageStyle={{
                    borderColor: '#DCDCDC',
                    borderWidth: 1,
                    borderRadius: 30,
                  }}
                  // blurRadius={isKakao ? 3 : 0}
                >
                  {!isKakao && this.renderCheck()}
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({ isKakao: false, isPaypal: true })
                }
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <ImageBackground
                  source={PAYPAL_ICON}
                  style={styles.paymentIcon}
                  imageStyle={{
                    borderColor: '#DCDCDC',
                    borderWidth: 1,
                    borderRadius: 30,
                  }}
                  // blurRadius={!isKakao ? 3 : 0}
                >
                  {!isPaypal && this.renderCheck()}
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 3,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <OrangeButton text="Next" onPress={this.handleNext} marginTop={0} />
            <Text style={{ ...styles.warning }}>
              {warn ? '결제수단을 선택해주세요!' : ' '}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };
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
    setNewChallenge: newChallenge =>
      dispatch({
        type: SET_NEW_CHALLENGE,
        payload: { newChallenge },
      }),
  }),
)(PaymentMethod);
