import React, { Component } from 'react';
import {
  WebView, SafeAreaView, Linking, Alert,
} from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import PropTypes from 'prop-types';
import Success from './Success';

const source = require('./payment.html');

const propTypes = {
  billingInformation: PropTypes.shape({
    pg: PropTypes.oneOf(['kakaopay', 'paypal']).isRequired,
    amount: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]),
    buyer_email: PropTypes.string.isRequired,
    buyer_name: PropTypes.string.isRequired,
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

const defaultProps = {
  billingInformation: {
    pg: 'kakaopay',
    amount: 64900,
    buyer_email: 'gildong@gmail.com',
    buyer_name: '홍길동',
  },
};

class Payment extends Component {
  isLoaded = false

  defaultBillingInfo = () => {
    const { billingInformation: { pg, amount } } = this.props;
    return {
      pay_method: 'card',
      merchant_uid: `merchant_${new Date().getTime()}`,
      name: 'Flint Challenge',
      currency: pg === 'paypal' ? 'USD' : 'KRW',
      amount: pg === 'paypal' ? amount / 1000 : amount,
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
        navigation.navigate('Success');
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

  sendPropsToWebView = () => {
    const { billingInformation } = this.props;
    const data = { ...billingInformation, ...this.defaultBillingInfo() };
    if (!this.isLoaded) {
      this.isLoaded = true;
      this.xdm.postMessage(JSON.stringify(data));
    }
  }

  openExternalLink = req => {
    const { navigation: { navigate } } = this.props;
    const { url } = req;
    const isKakao = url.search('kakaotalk://') !== -1;
    const isPaypal = url.search('paypal://') !== -1;
    const isFlint = url.search('flint://') !== -1;
    if (isFlint) {
      navigate('Success');
    }
    if (isKakao || isPaypal) {
      Linking.openURL(url);
      return false;
    }
    return true;
  }

  render = () => {
    const { navigation } = this.props;
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
          onError={() => Alert.alert('결제실패 :(', '문제가 발생했습니다. 다시 시도해주세요!', [{
            text: '보러가기',
            onPress: () => navigation.goBack(),
          }])}
        />
      </SafeAreaView>
    );
  }
}
Payment.propTypes = propTypes;
Payment.defaultProps = defaultProps;

export default createAppContainer(createSwitchNavigator({
  App: {
    screen: Payment,
  },
  Success: {
    screen: Success,
  },
}));
