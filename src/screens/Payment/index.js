/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  WebView, SafeAreaView, Linking, Alert, AsyncStorage, ActivityIndicator, View,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

const source = require('./payment.html');

const BASE_URL = 'http://13.209.19.196:3000';

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

class Payment extends Component {
  state = {
    loading: false,
  }

  isLoaded = false

  defaultBillingInfo = async () => {
    const { navigation: { state: { params: { amount, isKakao } } } } = this.props;
    const { email, nickname } = JSON.parse(await AsyncStorage.getItem('userInfo'));
    return {
      pg: isKakao ? 'kakaopay' : 'paypal',
      buyer_email: email,
      buyer_name: nickname,
      app_scheme: 'flint',
      pay_method: 'card',
      merchant_uid: `flint_merchant_${new Date().getTime()}`,
      name: 'Flint Challenge',
      currency: !isKakao ? 'USD' : 'KRW',
      amount: !isKakao ? amount / 1000 : amount,
      m_redirect_url: 'https://flint/payment/success',
    };
  }

  getInjectedJavascript = () => { // 웹뷰 onMessage override 방지 코드
    /* global window */
    const patchPostMessageFunction = () => {
      const originalPostMessage = window.postMessage;
      const patchedPostMessage = (message, targetOrigin, transfer) => {
        originalPostMessage(message, targetOrigin, transfer);
      };
      patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
      window.postMessage = patchedPostMessage;
    };
    return `(${String(patchPostMessageFunction)})();`;
  }

  onMessage = async e => {
    const { navigation } = this.props;
    const { state: { params: { challengeId } } } = navigation;
    try {
      const response = JSON.parse(e.nativeEvent.data);
      const { imp_uid, merchant_uid } = response;

      const { data: { status } } = await axios.post(`${BASE_URL}/payment/complete/${challengeId}`, {
        imp_uid, merchant_uid,
      });

      if (status === 'success') {
        navigation.navigate('Success', {
          setting: navigation.state.params.setting,
        });
      } else {
        Alert.alert('결제실패 :(', '문제가 발생했습니다. 다시 시도해주세요!', [{
          text: '보러가기',
          onPress: () => navigation.popToTop(),
        }]);
      }
    } catch (error) {
      Alert.alert('결제실패 :(', '문제가 발생했습니다. 다시 시도해주세요!', [{
        text: '보러가기',
        onPress: () => navigation.popToTop(),
      }]);
    }
  }

  sendPropsToWebView = async () => {
    const data = await this.defaultBillingInfo();
    if (!this.isLoaded) {
      this.isLoaded = true;
      this.xdm.postMessage(JSON.stringify(data));
    }
  }

  getAllUrlParams = url => {
    let queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    const obj = {};
    if (queryString) {
      const [firstquery] = queryString.split('#');
      queryString = firstquery;
      const arr = queryString.split('&');
      for (let i = 0; i < arr.length; i += 1) {
        const a = arr[i].split('=');
        let paramName = a[0];
        let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
        if (paramName.match(/\[(\d+)?\]$/)) {
          const key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
          if (paramName.match(/\[\d+\]$/)) {
            const index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            obj[key].push(paramValue);
          }
        } else if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }

    return obj;
  }

  openExternalLink = async req => {
    const { navigation } = this.props;
    const { url } = req;
    const isFlint = url.search('https://flint/payment/success') !== -1;
    const isKakao = url.search('kakaotalk://') !== -1;
    if (isFlint) {
      this.setState({ loading: true });
      try {
        const { state: { params: { challengeId } } } = navigation;

        const newUrl = this.getAllUrlParams(url);
        const { imp_uid } = newUrl;
        const { merchant_uid } = newUrl;

        const { data: { status } } = await axios.post(`${BASE_URL}/payment/complete/${challengeId}`, {
          imp_uid, merchant_uid,
        });

        if (status === 'success') {
          this.setState({ loading: false });
          navigation.navigate('Success', {
            setting: navigation.state.params.setting,
          });
        } else {
          Alert.alert('결제실패 :(', '문제가 발생했습니다. 다시 시도해주세요!', [{
            text: '보러가기',
            onPress: () => navigation.popToTop(),
          }]);
        }
      } catch (error) {
        this.setState({ loading: false });
        console.log(error);
      }
      return false;
    }
    if (isKakao) {
      Linking.openURL(url);
      return false;
    }
    return true;
  }

  renderLoading = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  )

  render = () => {
    const { loading } = this.state;
    if (loading) return this.renderLoading();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          onLoadEnd={this.sendPropsToWebView}
          ref={xdm => { this.xdm = xdm; }}
          originWhitelist={['*']}
          injectedJavaScript={this.getInjectedJavascript()}
          onMessage={this.onMessage}
          source={source}
          thirdPartyCookiesEnabled
          useWebKit
          onShouldStartLoadWithRequest={this.openExternalLink}
        />
      </SafeAreaView>
    );
  }
}
Payment.propTypes = propTypes;

export default Payment;
