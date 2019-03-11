import React, { Component } from 'react';
import {
  View, Text, SafeAreaView, findNodeHandle, TextInput, Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OrangeButton } from '../../components';
import { challengeAction } from '../../actions';
import styles from './style';
import { numberWithCommas } from '../../modules/util';

const { SET_AMOUNT } = challengeAction;
const { width } = Dimensions.get('window');

class Amount extends Component {
  state = {
    isFree: false,
  }

  scrollToInput = node => {
    this.scroll.props.scrollToFocusedInput(node);
  }

  handleNext = () => {
    const { navigation, amount } = this.props;
    const { isFree } = this.state;
    if (isFree || amount.length < 1) {
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
    if (isFree) setAmount('0');
    if (!isFree) setAmount('');
  }

  handleInputChange = input => {
    const { setAmount } = this.props;
    const { isFree } = this.state;
    if (!isFree) setAmount(input);
  }

  render = () => {
    const { isFree } = this.state;
    const { amount } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
                style={styles.textInput}
                placeholder="금액(원)"
                onChangeText={input => this.handleInputChange(input)}
                blurOnSubmit={false}
                value={numberWithCommas(amount)}
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={this.handleNext}
                onFocus={event => this.scrollToInput(findNodeHandle(event.target))}
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
            </View>
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
