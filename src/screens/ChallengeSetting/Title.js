import React, { Component } from 'react';
import {
  View, Text, SafeAreaView, findNodeHandle, TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OrangeButton } from '../../components';
import { challengeAction } from '../../actions';
import styles from './style';

const { SET_TITLE } = challengeAction;

class Title extends Component {
  state = {
    warn: false,
  }

  componentDidUpdate = () => {
    const { title } = this.props;
    const { warn } = this.state;

    if (warn && title !== '') {
      this.setState({ warn: false });
    }
  }

  handleNext = () => {
    const { navigation, title } = this.props;
    if (title !== '') {
      this.setState({ warn: false });
      navigation.navigate('ChallengePeriod', {
        setting: navigation.state.params.setting,
      });
    } else {
      this.setState({ warn: true });
    }
  };

  scrollToInput = node => {
    this.scroll.props.scrollToFocusedInput(node);
  }

  render = () => {
    const { warn } = this.state;
    const { title, setTitle } = this.props;
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
              <Text style={{ fontSize: 20 }}>당신의 도전은 무엇인가요?</Text>
            </View>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              <View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => setTitle(text)}
                  blurOnSubmit={false}
                  value={title}
                  returnKeyType="next"
                  placeholder="도전 타이틀"
                  onSubmitEditing={this.handleNext}
                  onFocus={event => this.scrollToInput(findNodeHandle(event.target))}
                />
                <Text style={{ ...styles.warning, marginTop: 10 }}>{warn ? '타이틀을 입력해주세요!' : ' '}</Text>
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

Title.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    title: state.challenge.title,
  }),
  dispatch => ({
    setTitle: title => dispatch({ type: SET_TITLE, payload: { title } }),
  }),
)(Title);
