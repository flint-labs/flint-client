import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, AsyncStorage, Alert,
} from 'react-native';
import { createStackNavigator, NavigationEvents } from 'react-navigation';
import { SecureStore } from 'expo';
import PropTypes from 'prop-types';

import sendRequest from '../../modules/sendRequest';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import styles from './styles';

const { redButton, userInfoArea, userInfoEntry } = styles;

class UserInfo extends Component {
  state = {
    user: null,
    pending: false,
  };

  goTo = (screen) => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  }

  handleWillFocus = async () => {
    try {
      this.setState({ pending: true });
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (!userInfo) return;
      const { id } = JSON.parse(userInfo);
      if (!id) return;
      const { data: { user } } = await sendRequest('get', `/api/users/${id}`);
      if (user) this.setState({ user });
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      this.setState({ pending: false });
    }
  }

  handleSignOutButton = async () => {
    try {
      this.setState({ pending: true });
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      this.setState({ user: null });
      Alert.alert('로그아웃 성공!', '보고싶을 거에요 🥺');
      this.goTo('Home');
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      this.setState({ pending: false });
    }
  }

  renderInfoPage = () => {
    const { user } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={userInfoArea}>
          <Text style={userInfoEntry}>{user.email}</Text>
          <Text style={userInfoEntry}>{user.nickname}</Text>
          <Text style={userInfoEntry}>{user.gender}</Text>
          <Text style={userInfoEntry}>{user.birth}</Text>
          <Text style={userInfoEntry}>{`쟝고 : ${user.change}`}</Text>
          <Text>{' '}</Text>
          <TouchableOpacity onPress={this.handleSignOutButton}>
            <Text style={{ ...redButton, ...userInfoEntry }}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ ...redButton, ...userInfoEntry }}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderToSignInPage = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => this.goTo('SignIn')}>
        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Flint 회원이신가요?</Text>
      </TouchableOpacity>
    </View>
  )

  renderLoading = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  )

  renderInCondition = () => {
    const { pending, user } = this.state;
    if (!pending && user) return this.renderInfoPage();
    if (!pending && !user) return this.renderToSignInPage();
    return this.renderLoading();
  }

  render = () => (
    <>
      <NavigationEvents
        onWillFocus={this.handleWillFocus}
      />
      {this.renderInCondition()}
    </>
  )
}

UserInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const userInfoNavigator = createStackNavigator({
  userInfo: {
    screen: UserInfo,
    navigationOptions: ({ navigation }) => ({
      title: 'My Page',
    }),
  },
  SignIn: {
    screen: SignIn,
  },
  SignUp: {
    screen: SignUp,
  },
}, {
  navigationOptions: ({ navigation: { state } }) => ({ tabBarVisible: !(state.index > 0) }),
});

export default userInfoNavigator;
