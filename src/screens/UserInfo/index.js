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
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import sendRequest from '../../modules/sendRequest';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import styles from './styles';

class UserInfo extends Component {
  static navigationOptions = {
    header: null,
  };

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
      await AsyncStorage.removeItem('recentChallenge');
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

  handleDeleteAccountButton = async () => {
    try {
      const { id } = JSON.parse(await AsyncStorage.getItem('userInfo'));
      const res = await axios.delete(
        `http://13.209.19.196:3000/api/users/deleteAccount/${id}`,
      );

      this.setState({ pending: true });
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('recentChallenge');
      await SecureStore.deleteItemAsync('refreshToken');
      this.setState({ user: null });
      Alert.alert('감사합니다.');
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      this.setState({ pending: false });
    }
  };

  numberWithCommas = x => {
    const temp = x.split(',').join('');
    return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  renderInfoPage = () => {
    const { user } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.userNicknameContainer}>
          <View
            style={{ flex: 2, flexDirection: 'row', alignItems: 'flex-end' }}
          >
            <Text style={{ fontSize: 30, fontWeight: '700' }}>
              {user.nickname}
            </Text>
            <Text style={{ fontSize: 17 }}> 님</Text>
          </View>
        </View>

        <View style={styles.userChallengeStateContainer}>
          <View style={styles.inProgressChallenge}>
            <Text style={{ fontSize: 25, color: '#FF6600' }}>
              {user.inProgress}
            </Text>
            <Text style={{ fontSize: 12, color: '#333' }}>진행중</Text>
          </View>
          <View style={styles.totalChallenges}>
            <Text style={{ fontSize: 25, color: '#FF6600' }}>
              {user.totalChallenges}
            </Text>
            <Text style={{ fontSize: 12, color: '#333' }}>도전 횟수</Text>
          </View>
          <View style={styles.successChallenge}>
            <Text style={{ fontSize: 25, color: '#FF6600' }}>
              {user.success}
            </Text>
            <Text style={{ fontSize: 12, color: '#333' }}>성공 횟수</Text>
          </View>
        </View>

        <View style={{ flex: 2, backgroundColor: '#dcdcdc' }}>
          <Text
            style={{
              marginLeft: 15,
              marginTop: 15,
              fontSize: 16,
              fontWeight: '600',
            }}
          >
            현재 잔액
          </Text>
          <View style={styles.change}>
            <Text style={{ fontSize: 30, fontWeight: '600' }}>
              ₩ {this.numberWithCommas(user.change.toString())}
            </Text>
          </View>
        </View>

        <View style={{ flex: 4, backgroundColor: 'white' }}>
          <TouchableOpacity style={styles.userInfoEtc}>
            <Text style={{ marginLeft: 15, fontSize: 15, color: '#444' }}>
              개인정보 약관
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.userInfoEtc}>
            <Text style={{ marginLeft: 15, fontSize: 15, color: '#444' }}>
              Support
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.userInfoEtc}
            onPress={this.handleSignOutButton}
          >
            <Text style={{ marginLeft: 15, fontSize: 15, color: 'red' }}>
              로그아웃
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.userInfoEtc}
            onPress={this.handleDeleteAccountButton}
          >
            <Text style={{ marginLeft: 15, fontSize: 15, color: 'red' }}>
              회원탈퇴
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1, backgroundColor: 'white' }} />
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
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationEvents onWillFocus={this.handleWillFocus} />
      {this.renderInCondition()}
    </SafeAreaView>
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
