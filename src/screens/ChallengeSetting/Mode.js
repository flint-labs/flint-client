import React, { Component } from 'react';
import {
  View, Text, SafeAreaView, findNodeHandle, TextInput, AsyncStorage, ActivityIndicator, AlertIOS,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OrangeButton } from '../../components';
import { challengeAction } from '../../actions';
import styles from './style';
import { filterList } from '../../modules/util';

const { SET_REFEREE } = challengeAction;
const BASE_URL = 'http://13.209.19.196:3000';

class Mode extends Component {
  state = {
    isSolo: true,
    isValid: false,
    loading: false,
    alerted: false,
    filteredNicknames: null,
  }

  userNicknames = null;

  nickname = '';

  scrollToInput = node => {
    this.scroll.props.scrollToFocusedInput(node);
  }

  componentDidUpdate = async () => {
    const { isValid, isSolo, alerted } = this.state;
    const { referee } = this.props;

    if (referee !== '') {
      try {
        const { data: { isExist } } = await axios.get(`${BASE_URL}/api/users/checkNickname/${referee}`);
        if (isExist !== isValid) {
          this.setState({ isValid: isExist });
        }
      } catch (error) {
        throw error;
      }
    }

    if (!isSolo && !alerted) {
      AlertIOS.alert('Referee 모드', 'Referee 모드 선택 시 해당 referee 에게 달성보고를 해야하며 보고가 누락되거나 referee 가 인정하지 않을 경우 도전이 실패할 수 있습니다.');
      this.setState({ alerted: true });
    }
  };

  handleNext = async () => {
    const { isValid, isSolo } = this.state;
    const { navigation } = this.props;
    if ((!isSolo && isValid) || isSolo) {
      navigation.navigate('CheckingPeriod', {
        setting: navigation.state.params.setting,
      });
    }
  };

  handleWillFocus = async () => {
    this.setState({ loading: true });
    const { isValid } = this.state;
    const { referee, setReferee } = this.props;
    const { nickname } = JSON.parse(await AsyncStorage.getItem('userInfo'));
    this.nickname = nickname;
    if (this.nickname === referee) {
      this.setState({ isSolo: true });
      setReferee('');
    }
    if (referee !== '') {
      const { data: { isExist } } = await axios.get(`${BASE_URL}/api/users/checkNickname/${referee}`);
      if (isExist !== isValid) {
        this.setState({ isValid: isExist });
      }
    }
    const { data: userNicknames } = await axios.get(`${BASE_URL}/api/users?nickname=true`);
    this.userNicknames = userNicknames;
    this.setState({ loading: false });
  }

  handleWillBlur = async () => {
    const { isSolo } = this.state;
    const { setReferee, referee } = this.props;
    if (isSolo) {
      setReferee(this.nickname);
    } else {
      setReferee(referee);
    }
  }

  renderLoading = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  )

  onRefereeChange = text => {
    const { userNicknames } = this;
    const { setReferee } = this.props;
    setReferee(text);
    this.setState({ filteredNicknames: filterList(userNicknames, 'nickname', text) });
  }

  render = () => {
    const {
      isSolo, isValid, loading, filteredNicknames,
    } = this.state;
    const { referee } = this.props;

    if (loading) return this.renderLoading();

    console.log(filteredNicknames);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationEvents
          onWillFocus={this.handleWillFocus}
          onWillBlur={this.handleWillBlur}
        />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
          enableAutomaticScroll
          extraHeight={235}
          innerRef={ref => {
            this.scroll = ref;
          }}
        >
          <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 20 }}>어떤 모드로 진행할까요?</Text>
            </View>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>

              <View style={{ ...styles.pickerBox, flex: 1 }}>
                <CheckBox
                  title="Solo"
                  checked={isSolo}
                  onPress={() => this.setState({ isSolo: true })}
                />
                <CheckBox
                  title="Referee"
                  checked={!isSolo}
                  onPress={() => this.setState({ isSolo: false })}
                />
              </View>

              <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                {isSolo ? (
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    {'스스로 진행 상황을 체크합니다.'}
                  </Text>
                ) : (
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                      {'심판을 맡길 유저의 닉네임을 입력해주세요.'}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={text => this.onRefereeChange(text)}
                      blurOnSubmit={false}
                      value={referee}
                      returnKeyType="next"
                      placeholder="심판 닉네임"
                      onSubmitEditing={this.handleNext}
                      onFocus={event => this.scrollToInput(findNodeHandle(event.target))}
                    />
                    {isValid ? (
                      <Text style={{ fontSize: 12, color: 'green', marginTop: 6 }}>
                        {referee !== '' ? '훌륭한 심판이십니다.' : ' '}
                      </Text>
                    ) : (
                      <Text style={{ fontSize: 12, color: 'red', marginTop: 6 }}>
                        {referee !== '' ? '등록되지않은 아이디 입니다.' : ' '}
                      </Text>
                    )}
                  </View>
                )}
              </View>

            </View>
            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
              <OrangeButton text="Next" onPress={this.handleNext} marginTop={0} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

Mode.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  referee: PropTypes.string.isRequired,
  setReferee: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    referee: state.challenge.referee,
  }),
  dispatch => ({
    setReferee: referee => {
      dispatch({ type: SET_REFEREE, payload: { referee } });
    },
  }),
)(Mode);
