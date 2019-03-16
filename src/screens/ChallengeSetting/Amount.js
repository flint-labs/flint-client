import React, { Component } from 'react';
import {
  View, Text, SafeAreaView, findNodeHandle, TextInput, Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import Toast, { DURATION } from 'react-native-easy-toast';
import { OrangeButton } from '../../components';
import { challengeAction } from '../../actions';
import styles from './style';
import { numberWithCommas } from '../../modules/util';

const { SET_AMOUNT } = challengeAction;
const { width } = Dimensions.get('window');

class Amount extends Component {
  state = {
    isFree: false,
    warn: false,
    textLoading: false,
    prevAmount: '',
  }

  componentDidMount = () => {
    this.showToast = this.throttle(() => this.toast.show('최대 100만원 까지 가능합니다.', DURATION.LENGTH_LONG), 2000);
  }

  componentDidUpdate = () => {
    const { warn, isFree } = this.state;
    const { amount } = this.props;
    if ((amount !== '0' && amount !== '') && warn && !isFree) {
      this.setState({ warn: false });
    }
  }

  scrollToInput = node => {
    this.scroll.props.scrollToFocusedInput(node);
  }

  handleNext = () => {
    const { navigation, amount } = this.props;
    const { isFree } = this.state;
    if (amount === '' || (!isFree && amount === '0')) {
      this.setState({ warn: true });
    } else if (isFree) {
      navigation.navigate('Slogan', {
        setting: navigation.state.params.setting,
      });
    } else {
      navigation.navigate('Receipient', {
        setting: navigation.state.params.setting,
      });
    }
  };

  handleCheckBoxOnPress = async () => {
    const { isFree } = this.state;
    await this.setState({ isFree: !isFree });
    this.handleIsFree();
  };

  handleIsFree = () => {
    const { isFree } = this.state;
    const { setAmount } = this.props;
    if (isFree) {
      setAmount('0');
      this.setState({ warn: false });
    }
    if (!isFree) setAmount('');
  }

  throttle = (func, wait) => {
    let isCalled = false;
    return function ineer(...args) {
      if (!isCalled) {
        isCalled = !isCalled;
        func.apply(this, args);
        setTimeout(() => {
          isCalled = !isCalled;
        }, wait);
      }
    };
  }

  handleInputChange = input => {
    this.setState({ textLoading: true });
    if (input.charAt(input.length - 1) === '.') return;
    const { setAmount, amount } = this.props;
    if (input.split(',').join('').length > amount.length) {
      if (input.length === 1) {
        const newAmount = Number(input) * 1000;
        setAmount(newAmount.toString());
        this.setState({ prevAmount: newAmount.toString() });
      } else {
        const lastChar = input.charAt(input.length - 1);
        const prevInput = input.slice(0, input.length - 1);
        const newAmount = Number(`${Number(prevInput.split(',').join('')) / 1000}${lastChar}`) * 1000;

        if (newAmount > 1000000) {
          this.showToast();
          setAmount('1000000');
          this.setState({ prevAmount: newAmount.toString() });
        } else {
          setAmount(newAmount.toString());
          this.setState({ prevAmount: newAmount.toString() });
        }
      }
    } else {
      const newInput = input.split(',').join('');
      if (newInput.length < 4) {
        setAmount('');
        this.setState({ prevAmount: '' });
      } else {
        const sliced = `${Number(newInput) / 100}`;
        const newAmount = Number(sliced.slice(0, sliced.length - 1)) * 1000;
        setAmount(newAmount.toString());
        this.setState({ prevAmount: newAmount.toString() });
      }
    }
    this.setState({ textLoading: false });
  }

  handleDidFocus = () => {
    this.input.focus();
  }

  render = () => {
    const {
      isFree, warn, textLoading, prevAmount,
    } = this.state;
    const { amount } = this.props;
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
              <Text style={{ fontSize: 20 }}>얼마를 묶어 둘까요?</Text>
            </View>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                ref={ref => { this.input = ref; }}
                style={styles.textInput}
                placeholder="금액(원)"
                onChangeText={input => this.handleInputChange(input)}
                blurOnSubmit={false}
                value={textLoading ? numberWithCommas(prevAmount) : numberWithCommas(amount)}
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={this.handleNext}
                onFocus={event => this.scrollToInput(findNodeHandle(event.target))}
                editable={!isFree}
              />
              <View style={{ width: width * 0.8 }}>
                <CheckBox
                  title="💪의지로만 하기"
                  containerStyle={{
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 0,
                  }}
                  checked={isFree}
                  onPress={this.handleCheckBoxOnPress}
                />
              </View>
            </View>
            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
              <OrangeButton text="Next" onPress={this.handleNext} marginTop={0} />
              <Text style={{ ...styles.warning }}>{warn ? '금액을 입력해주세요!' : ' '}</Text>
            </View>
            <Toast
              ref={ref => { this.toast = ref; }}
              style={{ backgroundColor: 'white' }}
              position="top"
              positionValue={180}
              fadeInDuration={500}
              fadeOutDuration={500}
              textStyle={{ color: 'rgba(255,102,0,0.7)' }}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

Amount.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  amount: PropTypes.string.isRequired,
  setAmount: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    amount: state.challenge.amount,
  }),
  dispatch => ({
    setAmount: amount => dispatch({ type: SET_AMOUNT, payload: { amount } }),
  }),
)(Amount);
