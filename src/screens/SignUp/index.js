import React, { Component } from 'react';
import {
  Text, View, SafeAreaView, findNodeHandle, Picker, Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthInput, OrangeButton } from '../../components';
import styles from './styles';

const { width: WIDTH } = Dimensions.get('window');
const thisYear = new Date().getFullYear();

class Authentication extends Component {
  state = {
    page: 0,
    email: '',
    password: '',
    confirm: '',
    name: '',
    gender: '',
    birth: '',
    // location: '',
  }

  scrollToInput(node) {
    this.scroll.props.scrollToFocusedInput(node);
  }

  renderIcon = ({ name, style }) => (
    <Icon name={name} size={20} color="#333" style={style} />
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
  )

  renderConfirmInput = confirm => (
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
  )

  renderNameInput = name => (
    <AuthInput
      state={name}
      setState={text => this.setState({ name: text })}
      renderIcon={() => this.renderIcon({ name: 'ios-person', style: { paddingLeft: 2 } })}
      customProps={{
        placeholder: '이름을 입력해주세요.',
        ref: (input) => {
          this.fourthTextInput = input;
        },
        onFocus: event => this.scrollToInput(findNodeHandle(event.target)),
      }}
    />
  )

  renderBirthPicker = birth => (
    <Picker
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
      selectedValue={gender}
      style={{ width: WIDTH * 0.7 }}
      onValueChange={itemValue => this.setState({ gender: itemValue })}
    >
      <Picker.Item label="남자" value="man" />
      <Picker.Item label="여자" value="woman" />
    </Picker>
  )

  render = () => {
    const {
      email, password, confirm, name, page, birth, gender,
    } = this.state;
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
              <Text style={styles.header}>Sign Up</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 18 }}>
              <View style={{ alignItems: 'center' }}>
                {page === 0 && this.renderEmailInput(email)}
                {page === 0 && this.renderPasswordInput(password)}
                {page === 0 && this.renderConfirmInput(confirm)}
                {page === 0 && this.renderNameInput(name)}
                {page === 1 && this.renderBirthPicker(birth)}
                {page === 2 && this.renderGenderPicker(gender)}
              </View>
              {page === 2 ? <OrangeButton text="Sign Up" onPress={() => this.setState({ page: 0 })} />
                : <OrangeButton text="Next" onPress={() => this.setState({ page: page + 1 })} />}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default Authentication;
