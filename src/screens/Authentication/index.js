import React, { Component } from 'react';
import {
  Text, View, TextInput, findNodeHandle, SafeAreaView, TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';


class Authentication extends Component {
  state = {
    email: '',
    password: '',
  }

  scrollToInput(node) {
    this.scroll.props.scrollToFocusedInput(node);
  }

  render = () => {
    const { email, password } = this.state;
    return (
      <SafeAreaView style={{ /* backgroundColor: 'red', */ flex: 1 }}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
          scrollEnabled={false}
          enableAutomaticScroll
          extraHeight={180}
          innerRef={(ref) => {
            this.scroll = ref;
          }}
          style={{ /* backgroundColor: 'orange' */ }}
        >
          <View style={{
            flex: 1, alignItems: 'center', justifyItems: 'center', /* backgroundColor: 'yellow', */
          }}
          >
            <View style={{ flex: 4, /* backgroundColor: 'green', */ justifyContent: 'flex-end' }}>
              <Text style={styles.header}>
            Sign In
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 8 /* backgroundColor: 'blue' */ }}>
              <View style={styles.inputContainer}>
                <View style={styles.input}>
                  <Icon name="ios-mail" size={20} color="#333" />
                  <TextInput
                    style={styles.inputElement}
                    placeholder="이메일을 입력해주세요."
                    onChangeText={(text) => {
                      this.setState({ email: text });
                    }}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.secondTextInput.focus();
                    }}
                    blurOnSubmit={false}
                    onFocus={(event) => {
                      this.scrollToInput(findNodeHandle(event.target));
                    }}
                    value={email}
                  />
                </View>
                <View style={styles.input}>
                  <Icon
                    name="ios-lock"
                    size={20}
                    color="#333"
                    style={{ paddingRight: 4, paddingLeft: 4 }}
                  />
                  <TextInput
                    style={styles.inputElement}
                    placeholder="비밀번호를 입력해주세요."
                    secureTextEntry
                    onChangeText={(text) => {
                      this.setState({ password: text });
                    }}
                    ref={(input) => {
                      this.secondTextInput = input;
                    }}
                    onFocus={(event) => {
                      this.scrollToInput(findNodeHandle(event.target));
                    }}
                    value={password}
                  />
                </View>
                <View style={styles.registerButtonBox}>
                  <Text>
                  Flint 회원이 아니신가요?
                  </Text>
                  <TouchableOpacity>
                    <Text style={{ fontWeight: 'bold' }}> 지금 가입하세요 🎉</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default Authentication;
