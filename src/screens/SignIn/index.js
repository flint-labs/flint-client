import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  findNodeHandle,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import { SecureStore } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import axios from 'axios';

import { AuthInput, OrangeButton } from '../../components';
import styles from './styles';

const BASE_URL = 'http://13.209.19.196:3000';

class SignIn extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    title: 'Sign In',
    headerLeft: (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="ios-arrow-round-back" size={35} />
      </TouchableOpacity>
    ),
  });

  state = {
    email: '',
    password: '',
  };

  goToScreen = screen => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate(screen);
  };

  scrollToInput = node => {
    this.scroll.props.scrollToFocusedInput(node);
  };

  handleSignInbutton = async () => {
    try {
      const { email, password } = this.state;
      if (email === '' || password === '') {
        return Alert.alert('모든 정보를 입력해주세요!');
      }
      const {
        navigation: { goBack },
      } = this.props;
      const { headers, data } = await axios.get(`${BASE_URL}/oauth/signIn`, {
        headers: { email, password },
      });
      const accessToken = headers['x-access-token'];
      const refreshToken = headers['x-refresh-token'];
      await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
      await AsyncStorage.setItem('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);

      await SecureStore.setItemAsync(
        'keyChain',
        JSON.stringify({ email, password }),
      );
      return Alert.alert(
        '로그인 성공!',
        `${data.user.nickname}님 환영합니다 🤗`,
        [{ text: 'OK', onPress: () => goBack() }],
      );
    } catch (error) {
      const { data } = error.response;
      return Alert.alert(`⚠️\n${data}`);
    }
  };

  renderIcon = ({ name, style }) => (
    <Icon name={name} size={20} color="#333" style={style} />
  );

  renderRegisterButton = () => (
    <View style={styles.registerButtonBox}>
      <Text style={{ color: '#333' }}>Flint 회원이 아니신가요?</Text>
      <TouchableOpacity onPress={() => this.goToScreen('SignUp')}>
        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>
          {' '}
          지금 가입하세요
        </Text>
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
        keyboardType: 'email-address',
      }}
    />
  );

  renderPasswordInput = password => (
    <AuthInput
      state={password}
      setState={text => this.setState({ password: text })}
      renderIcon={() =>
        this.renderIcon({ name: 'ios-lock', style: { paddingLeft: 4 } })
      }
      customProps={{
        placeholder: '비밀번호를 입력해주세요.',
        secureTextEntry: true,
        onSubmitEditing: this.handleSignInbutton,
        onFocus: event => this.scrollToInput(findNodeHandle(event.target)),
        ref: input => {
          this.secondTextInput = input;
        },
      }}
    />
  );

  render = () => {
    const { email, password } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
          scrollEnabled={false}
          enableAutomaticScroll
          extraHeight={280}
          innerRef={ref => {
            this.scroll = ref;
          }}
        >
          <View style={styles.container}>
            <View style={{ flex: 3 }} />
            <View style={{ flex: 9 }}>
              <View style={{ alignItems: 'center' }}>
                {this.renderEmailInput(email)}
                {this.renderPasswordInput(password)}
              </View>
              {this.renderRegisterButton()}
              <OrangeButton text="Sign in" onPress={this.handleSignInbutton} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  };
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default SignIn;
