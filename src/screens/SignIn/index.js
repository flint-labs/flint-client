import React, { Component } from 'react';
import {
  Text, View, SafeAreaView, findNodeHandle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { renderRegisterButton, renderIcon } from './SignIn';
import { AuthInput, OrangeButton } from '../../components';
import styles from './styles';

class Authentication extends Component {
  state = {
    email: '',
    password: '',
  }

  scrollToInput(node) {
    this.scroll.props.scrollToFocusedInput(node);
  }

  renderEmailInput = email => (
    <AuthInput
      state={email}
      setState={text => this.setState({ email: text })}
      renderIcon={() => renderIcon({ name: 'ios-mail' })}
      customProps={{
        placeholder: '이메일을 입력해주세요.',
        returnKeyType: 'next',
        onSubmitEditing: () => this.secondTextInput.focus(),
        onFocus: event => this.scrollToInput(findNodeHandle(event.target)),
      }}
    />
  )

  renderPasswordInput = password => (
    <AuthInput
      state={password}
      setState={text => this.setState({ password: text })}
      renderIcon={() => renderIcon({ name: 'ios-lock', style: { paddingLeft: 4 } })}
      customProps={{
        placeholder: '비밀번호를 입력해주세요.',
        secureTextEntry: true,
        ref: (input) => {
          this.secondTextInput = input;
        },
        onFocus: event => this.scrollToInput(findNodeHandle(event.target)),
      }}
    />
  )

  render = () => {
    const { email, password } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
          scrollEnabled={false}
          enableAutomaticScroll
          extraHeight={180}
          innerRef={(ref) => {
            this.scroll = ref;
          }}
        >
          <View style={styles.container}>
            <View style={{ flex: 3, justifyContent: 'flex-end' }}>
              <Text style={styles.header}>Sign In</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 8 }}>
              <View style={{ alignItems: 'center' }}>
                {this.renderEmailInput(email)}
                {this.renderPasswordInput(password)}
              </View>
              {renderRegisterButton()}
              <OrangeButton text="Sign in" />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default Authentication;
