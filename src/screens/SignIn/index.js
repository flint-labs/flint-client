import React, { Component } from 'react';
import {
  Text, View, SafeAreaView, findNodeHandle, TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import { AuthInput, OrangeButton } from '../../components';
import styles from './styles';

class SignIn extends Component {
  static navigationOptions = ({
    tabBarVisible: false,
    title: 'Sign In',
  });

  state = {
    email: '',
    password: '',
  }

  goToScreen = (screen) => {
    const { navigation: { navigate } } = this.props;
    navigate(screen);
  }

  scrollToInput(node) {
    this.scroll.props.scrollToFocusedInput(node);
  }

  renderIcon = ({ name, style }) => (
    <Icon name={name} size={20} color="#333" style={style} />
  );

  renderRegisterButton = () => (
    <View style={styles.registerButtonBox}>
      <Text style={{ color: '#333' }}>
        Flint 회원이 아니신가요?
      </Text>
      <TouchableOpacity onPress={() => this.goToScreen('SignUp')}>
        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}> 지금 가입하세요</Text>
      </TouchableOpacity>
      <Text>🎉</Text>
    </View>
  );

  renderEmailInput = email => (
    <AuthInput
      state={email}
      setState={text => this.setState({ email: text })}
      renderIcon={() => this.renderIcon({ name: 'ios-mail' })}
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
      renderIcon={() => this.renderIcon({ name: 'ios-lock', style: { paddingLeft: 4 } })}
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
              {/* <Text style={styles.header}>환영합니다 🤗</Text> */}
            </View>
            {/* <View style={{ flex: 1 }} /> */}
            <View style={{ flex: 8 }}>
              <View style={{ alignItems: 'center' }}>
                {this.renderEmailInput(email)}
                {this.renderPasswordInput(password)}
              </View>
              {this.renderRegisterButton()}
              <OrangeButton text="Sign in" />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default SignIn;
