import React, { Component } from 'react';
import {
  View, Text, SafeAreaView, findNodeHandle, TextInput, AsyncStorage,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OrangeButton } from '../../components';
import { challengeAction } from '../../actions';
import styles from './style';

const { SET_REFEREE } = challengeAction;

class Mode extends Component {
  state = {
    isSolo: false,
    isValid: false,
    referee: '',
  }

  scrollToInput = node => {
    this.scroll.props.scrollToFocusedInput(node);
  }

  componentDidUpdate = async () => {
    const { referee, isValid } = this.state;

    if (referee !== '') {
      try {
        const { data: { isExist } } = await axios.get(`http://13.209.19.196:3000/api/users/checkNickname/${referee}`);
        if (isExist !== isValid) {
          this.setState({ isValid: isExist });
        }
      } catch (error) {
        throw error;
      }
    }
  };

  handleNext = async () => {
    const { isSolo, referee } = this.state;
    const { navigation, setReferee } = this.props;
    if (isSolo) {
      const { nickname } = JSON.parse(await AsyncStorage.getItem('userInfo'));
      setReferee(nickname);
    } else {
      setReferee(referee);
    }
    navigation.navigate('CheckingPeriod', {
      setting: navigation.state.params.setting,
    });
  };

  render = () => {
    const {
      isSolo, isValid, referee,
    } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
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
                      {'심판으로 등록된 사용자가 체크합니다.'}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={text => this.setState({ referee: text })}
                      blurOnSubmit={false}
                      value={referee}
                      returnKeyType="next"
                      placeholder="심판 아이디"
                      onSubmitEditing={this.buttonHandler}
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
  setReferee: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    setReferee: referee => {
      dispatch({ type: SET_REFEREE, payload: { referee } });
    },
  }),
)(Mode);