import React, { Component } from 'react';
import {
  WebView, SafeAreaView, Linking, Alert, AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';

const source = require('./payment.html');

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

class Payment extends Component {
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
      merchant_uid: `merchant_${new Date().getTime()}`,
      name: 'Flint Challenge',
      currency: !isKakao ? 'USD' : 'KRW',
      amount: !isKakao ? amount / 1000 : amount,
      m_redirect_url: 'flint://payment/success',
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

  onMessage = e => {
    const { navigation } = this.props;
    try {
      const response = JSON.parse(e.nativeEvent.data);
      if (response.success) {
        navigation.navigate('Success', {
          setting: navigation.state.params.setting,
        });
      } else {
        Alert.alert('결제실패 :(', '문제가 발생했습니다. 다시 시도해주세요!', [{
          text: '보러가기',
          onPress: () => navigation.goBack(),
        }]);
      }
    } catch (error) {
      Alert.alert('결제실패 :(', '문제가 발생했습니다. 다시 시도해주세요!', [{
        text: '보러가기',
        onPress: () => navigation.goBack(),
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

  openExternalLink = req => {
    const { navigation } = this.props;
    const { url } = req;
    const isFlint = url.search('flint://payment/success') !== -1;
    const isKakao = url.search('kakaotalk://') !== -1;
    const isPaypal = url.search('paypal://') !== -1;
    if (isFlint) {
      navigation.navigate('Success', {
        setting: navigation.state.params.setting,
      });
      return false;
    }
    if (isKakao || isPaypal) {
      Linking.openURL(url);
      return false;
    }
    return true;
  }

  render = () => (
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
  )
}
Payment.propTypes = propTypes;

export default Payment;
