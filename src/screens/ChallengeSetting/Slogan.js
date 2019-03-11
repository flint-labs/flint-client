import React from 'react';
import {
  View, Text, SafeAreaView, findNodeHandle, TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OrangeButton } from '../../components';
import { challengeAction } from '../../actions';
import styles from './style';

const { SET_SLOGAN } = challengeAction;

const Slogan = ({
  navigation, slogan, setSlogan, amount,
}) => {
  const handleNext = () => {
    if (amount !== '0') {
      navigation.navigate('PaymentMethod', {
        setting: navigation.state.params.setting,
      });
    } else {
      navigation.navigate('StartChallenge', {
        setting: navigation.state.params.setting,
      });
    }
  };

  let scroll;
  const scrollToInput = node => {
    if (scroll) scroll.props.scrollToFocusedInput(node);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flex: 1 }}
        enableAutomaticScroll
        extraHeight={235}
        innerRef={ref => { scroll = ref; }}
      >
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 20 }}>각오 한마디</Text>
          </View>
          <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setSlogan(text)}
              blurOnSubmit={false}
              value={slogan}
              returnKeyType="next"
              onSubmitEditing={handleNext}
              onFocus={event => scrollToInput(findNodeHandle(event.target))}
            />
          </View>
          <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
            <OrangeButton text="Next" onPress={handleNext} marginTop={0} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

Slogan.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  slogan: PropTypes.string.isRequired,
  setSlogan: PropTypes.func.isRequired,
  amount: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    slogan: state.challenge.slogan,
    amount: state.challenge.amount,
  }),
  dispatch => ({
    setSlogan: slogan => dispatch({ type: SET_SLOGAN, payload: { slogan } }),
  }),
)(Slogan);
