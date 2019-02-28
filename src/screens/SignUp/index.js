import React, { Component } from 'react';
import {
  Text, View, SafeAreaView, findNodeHandle, Picker, Dimensions, BackHandler, Alert, Button,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import { emailCheck, passwordCheck, confirmCheck } from './schema';
import { AuthInput, OrangeButton } from '../../components';
import styles from './styles';

const { width: WIDTH } = Dimensions.get('window');
const thisYear = new Date().getFullYear();

class SignUp extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Sign Up',
    tabBarVisible: false,
    headerLeft: (
      <Button
        title="Back"
        onPress={navigation.getParam('handleBackButton') || navigation.goBack}
      />
    ),
  });

  state = {
    page: 0,
    email: '',
    password: '',
    confirm: '',
    name: '',
    showWarning: false,
    gender: '',
    birth: '',
    // location: '',
  }

  validations = {
    email: false,
    password: false,
    confirm: false,
  }

  isValidAll = () => {
    const { name } = this.state;
    return Object.values(this.validations).every(validation => validation) && name;
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    navigation.setParams({ handleBackButton: this.handleBackButton });
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  handleBackButton = () => {
    const { page } = this.state;
    const { navigation: { goBack } } = this.props;
    if (page > 0) this.setState({ page: page - 1 });
    else goBack();
  }

  scrollToInput(node) {
    this.scroll.props.scrollToFocusedInput(node);
  }

  renderIcon = ({ name, style }) => (
    <Icon name={name} size={20} color="#333" style={style} />
  );

  renderEmailInput = (email) => {
    const { validations } = this;
    const isValid = emailCheck(email);
    if (validations.email !== isValid) validations.email = isValid;
    const message = isValid ? '좋은 이메일이에요!' : '이메일 형식에 맞지 않습니다.';
    return (
      <View key="email">
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
        {<Text style={isValid ? styles.success : styles.warning}>{email === '' ? ' ' : message}</Text>}
      </View>
    );
  }

  renderPasswordInput = (password) => {
    const { validations } = this;
    const isValid = passwordCheck(password);
    if (validations.password !== isValid) validations.password = isValid;
    const message = isValid ? '안전한 비밀번호에요!' : '1자리 이상의 대,소문자 영어 및 숫자를 입력해주세요.';
    return (
      <View key="password">
        <AuthInput
          state={password}
          setState={text => this.setState({ password: text })}
          renderIcon={() => this.renderIcon({ name: 'ios-key' })}
          customProps={{
            placeholder: '비밀번호를 입력해주세요.',
            secureTextEntry: true,
            returnKeyType: 'next',
            onSubmitEditing: () => this.thirdTextInput.focus(),
            ref: (input) => {
              this.secondTextInput = input;
            },
            onFocus: event => this.scrollToInput(findNodeHandle(event.target)),
          }}
        />
        {<Text style={isValid ? styles.success : styles.warning}>{password === '' ? ' ' : message}</Text>}
      </View>
    );
  }

  renderConfirmInput = (password, confirm) => {
    const { validations } = this;
    const isValid = confirmCheck(password, confirm);
    if (validations.confirm !== isValid) validations.confirm = isValid;
    const message = isValid ? '정확히 입력하셨어요!' : '비밀번호가 일치하지 않습니다.';
    return (
      <View key="confirm">
        <AuthInput
          state={confirm}
          setState={text => this.setState({ confirm: text })}
          renderIcon={() => this.renderIcon({ name: 'ios-key' })}
          customProps={{
            placeholder: '비밀번호를 확인해주세요.',
            secureTextEntry: true,
            returnKeyType: 'next',
            onSubmitEditing: () => this.fourthTextInput.focus(),
            ref: (input) => {
              this.thirdTextInput = input;
            },
            onFocus: event => this.scrollToInput(findNodeHandle(event.target)),
          }}
        />
        {<Text style={isValid ? styles.success : styles.warning}>{confirm === '' ? ' ' : message}</Text>}
      </View>
    );
  }

  renderNameInput = name => (
    <AuthInput
      key="name"
      state={name}
      setState={text => this.setState({ name: text })}
      renderIcon={() => this.renderIcon({ name: 'ios-person', style: { paddingLeft: 2 } })}
      customProps={{
        placeholder: '이름을 입력해주세요.',
        onSubmitEditing: () => {
          if (this.isValidAll()) {
            this.setState({ page: 1 });
          } else this.setState({ showWarning: true });
        },
        ref: (input) => {
          this.fourthTextInput = input;
        },
        onFocus: event => this.scrollToInput(findNodeHandle(event.target)),
      }}
    />
  )

  renderBirthPicker = birth => (
    <Picker
      key="birth"
      selectedValue={birth}
      style={{ width: WIDTH * 0.7 }}
      onValueChange={itemValue => this.setState({ birth: itemValue })}
    >
      {new Array(120).fill(null).map((el, index) => {
        const value = (thisYear - index).toString();
        return <Picker.Item key={value} label={value} value={value} />;
      })}
    </Picker>
  )

  renderGenderPicker = gender => (
    <Picker
      key="gender"
      selectedValue={gender}
      style={{ width: WIDTH * 0.7 }}
      onValueChange={itemValue => this.setState({ gender: itemValue })}
    >
      <Picker.Item label="남자" value="man" />
      <Picker.Item label="여자" value="woman" />
    </Picker>
  )

  renderInputs = (page) => {
    const { name, birth, gender } = this.state;
    const { email, password, confirm } = this.state;
    switch (page) {
      case 0:
        return [
          this.renderEmailInput(email),
          this.renderPasswordInput(password),
          this.renderConfirmInput(password, confirm),
          this.renderNameInput(name),
        ];
      case 1:
        return [this.renderBirthPicker(birth)];
      case 2:
        return [this.renderGenderPicker(gender)];
      default:
        return null;
    }
  }

  renderHeaders = (page) => {
    switch (page) {
      case 0:
        return '🤗환영합니다🤗';
      case 1:
        return '🎂태어난 연도를 선택해주세요🎂';
      case 2:
        return '👨성별을 선택해주세요👩';
      default:
        return null;
    }
  }

  renderButton = (page) => {
    switch (page) {
      case 0:
        return (
          <OrangeButton
            text="Next"
            onPress={() => {
              if (this.isValidAll()) {
                this.setState({ page: page + 1 });
              } else this.setState({ showWarning: true });
            }}
          />
        );
      case 1:
        return (
          <OrangeButton
            text="Next"
            onPress={() => this.setState({ page: page + 1 })}
          />
        );
      case 2:
        return (
          <OrangeButton
            text="Sign Up"
            onPress={() => {
              const { navigation: { goBack } } = this.props;
              Alert.alert('회원가입을 축하합니다 🎉');
              goBack();
            }}
          />
        );
      default:
        return null;
    }
  }

  renderWarningText = () => {
    const { page, showWarning } = this.state;
    if (page === 0 && showWarning && !this.isValidAll()) {
      return <Text style={styles.warning}>모든 항목을 정확히 입력해주세요 :(</Text>;
    } return null;
  }

  render = () => {
    const { page } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
          enableAutomaticScroll
          extraHeight={180}
          innerRef={(ref) => {
            this.scroll = ref;
          }}
        >
          <View style={styles.container}>
            <View style={{ flex: 6, justifyContent: 'flex-end' }}>
              <Text style={styles.header}>{this.renderHeaders(page)}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 18 }}>
              <View style={{ alignItems: 'center' }}>
                {this.renderInputs(page).map(input => input)}
              </View>
              {this.renderButton(page)}
              {this.renderWarningText()}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

export default SignUp;
