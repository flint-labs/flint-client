import React, { Component } from 'react';
import {
  View, Text, SafeAreaView, findNodeHandle, TextInput, AsyncStorage,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import sendRequest from '../../modules/sendRequest';
import { OrangeButton } from '../../components';
import { challengeAction } from '../../actions';
import styles from './style';

const { SET_SLOGAN, RESET_CHALLENGE, SET_NEW_CHALLENGE } = challengeAction;

class Slogan extends Component {
  state = {
    warn: false,
  }

  componentDidUpdate = () => {
    const { warn } = this.state;
    const { slogan } = this.props;
    if (warn && slogan !== '') this.setState({ warn: false });
  }

  handleNext = async () => {
    const { navigation, amount, slogan } = this.props;
    if (slogan === '') {
      this.setState({ warn: true });
    } else if (amount !== '0') {
      navigation.navigate('PaymentMethod', {
        setting: navigation.state.params.setting,
      });
    } else {
      const { resetChallenge, setNewChallenge } = this.props;
      const newChallenge = await this.makeChallenge();
      const { data } = await sendRequest('post', '/api/challenges/setting', null, { challenge: newChallenge });

      resetChallenge();
      setNewChallenge(data);

      navigation.navigate('Success', {
        setting: navigation.state.params.setting,
      });
    }
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
      receipient_charity_id: null,
      receipient_user_id: null,
      description: 'undefined',
      merchant_uid: 'Strong-will',
    };
  };

  scrollToInput = node => {
    this.scroll.props.scrollToFocusedInput(node);
  }

  handleDidFocus = () => {
    this.input.focus();
  }

  render = () => {
    const { slogan, setSlogan } = this.props;
    const { warn } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationEvents
          onDidFocus={this.handleDidFocus}
        />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
          enableAutomaticScroll
          extraHeight={235}
          innerRef={ref => { this.scroll = ref; }}
        >
          <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 20 }}>각오 한마디</Text>
            </View>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              <View>
                <TextInput
                  ref={ref => { this.input = ref; }}
                  style={styles.textInput}
                  onChangeText={text => setSlogan(text)}
                  blurOnSubmit={false}
                  value={slogan}
                  returnKeyType="next"
                  onSubmitEditing={this.handleNext}
                  onFocus={event => this.scrollToInput(findNodeHandle(event.target))}
                />
                <Text style={{ ...styles.warning, marginTop: 10 }}>{warn ? '각오를 입력해주세요!' : ' '}</Text>
              </View>
            </View>
            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
              <OrangeButton text="시작하기" onPress={this.handleNext} marginTop={0} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

Slogan.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  slogan: PropTypes.string.isRequired,
  setSlogan: PropTypes.func.isRequired,
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
    slogan: state.challenge.slogan,
    amount: state.challenge.amount,
    challenge: state.challenge,
  }),
  dispatch => ({
    setSlogan: slogan => dispatch({ type: SET_SLOGAN, payload: { slogan } }),
    resetChallenge: () => dispatch({ type: RESET_CHALLENGE }),
    setNewChallenge: newChallenge => dispatch({
      type: SET_NEW_CHALLENGE, payload: { newChallenge },
    }),
  }),
)(Slogan);
