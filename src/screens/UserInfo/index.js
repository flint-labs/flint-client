import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { createStackNavigator, NavigationEvents } from 'react-navigation';
import { SecureStore } from 'expo';
import PropTypes from 'prop-types';

import sendRequest from '../../modules/sendRequest';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import styles from './styles';

const logo = {
  uri:
    'https://previews.123rf.com/images/theseamuss/theseamuss1507/theseamuss150700037/43273195-%EC%9B%90%ED%99%9C%ED%95%9C-%EC%96%BC%EC%9D%8C-%EC%A7%88%EA%B0%90-%EC%BB%B4%ED%93%A8%ED%84%B0-%EA%B7%B8%EB%9E%98%ED%94%BD-%ED%81%B0-%EC%BB%AC%EB%A0%89%EC%85%98.jpg',
};

class UserInfo extends Component {
  state = {
    user: null,
    pending: false,
  };

  goTo = screen => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  handleWillFocus = async () => {
    try {
      this.setState({ pending: true });
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (!userInfo) return;
      const { id } = JSON.parse(userInfo);
      if (!id) return;
      const {
        data: { user },
      } = await sendRequest('get', `/api/users/${id}`);
      if (user) this.setState({ user });
    } catch (error) {
      Alert.alert(
        '⚠️',
        '서버에 문제가 생겼습니다 :( \n 잠시 후 다시 시도해주세요!',
      );
      console.log(error.message);
    } finally {
      this.setState({ pending: false });
    }
  };

  handleSignOutButton = async () => {
    try {
      this.setState({ pending: true });
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      this.setState({ user: null });
      Alert.alert('로그아웃 성공!', '보고싶을 거에요 🥺', [
        {
          text: 'OK',
          onPress: () => this.goTo('Home'),
        },
      ]);
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      this.setState({ pending: false });
    }
  };

  renderLogo = change => (
    <View style={{ flex: 1 }}>
      <ImageBackground source={logo} style={styles.img}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 30, color: '#333' }}>
            {`잔액 : ${change}원`}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );

  renderInfoPage = () => {
    const { user } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        {this.renderLogo(user.change)}
        <View style={styles.userInfoArea}>
          <Text style={styles.userInfoEntry}>{`${user.nickname} 님`}</Text>
          <Text style={styles.userInfoEntry}>{user.email}</Text>
          <TouchableOpacity>
            <Text style={styles.userInfoEntry}>개인정보 처리방침</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.userInfoEntry}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleSignOutButton}>
            <Text style={{ ...styles.userInfoEntry, ...styles.redButton }}>
              Log Out
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ ...styles.userInfoEntry, ...styles.redButton }}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderToSignInPage = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => this.goTo('SignIn')}>
        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>
          Flint 회원이신가요?
        </Text>
      </TouchableOpacity>
    </View>
  );

  renderLoading = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );

  renderInCondition = () => {
    const { pending, user } = this.state;
    if (!pending && user) return this.renderInfoPage();
    if (!pending && !user) return this.renderToSignInPage();
    return this.renderLoading();
  };

  render = () => (
    <>
      <NavigationEvents onWillFocus={this.handleWillFocus} />
      {this.renderInCondition()}
    </>
  );
}

UserInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const userInfoNavigator = createStackNavigator(
  {
    userInfo: {
      screen: UserInfo,
      navigationOptions: {
        title: 'My Page',
      },
    },
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    navigationOptions: ({ navigation: { state } }) => ({
      tabBarVisible: !(state.index > 0),
    }),
  },
);

export default userInfoNavigator;
