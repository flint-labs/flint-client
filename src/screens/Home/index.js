import React, { Component } from 'react';
import {
  View, ScrollView, Dimensions, Text,
} from 'react-native';
import { createStackNavigator, NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Feedback from './Feedback';
import Intro from './Intro';
import ChallengeSetting from '../ChallengeSetting';
import Payment from '../Payment';
import Success from '../Payment/Success';
import SignIn from '../SignIn';
import styles from './Styles';
import SignUp from '../SignUp';

const { width } = Dimensions.get('window');

class Home extends Component {
  state = {
    isSetting: false,
  };

  handleSetting = () => {
    this.setState({ isSetting: true });
  };

  goToScreen = (screenName, cate) => {
    const { navigation } = this.props;
    navigation.navigate(screenName, {
      category: cate,
      setting: this.handleSetting,
    });
  };

  handleWillFocus = () => {
    const { isSetting } = this.state;
    const { navigation } = this.props;

    if (isSetting) {
      this.setState({ isSetting: false });
      navigation.navigate('Dashboard');
    }
  };

  render = () => (
    <View style={{ flex: 1 }}>
      <NavigationEvents onWillFocus={this.handleWillFocus} />

      <View style={styles.indexContainer}>
        <ScrollView style={{ flex: 1, width }}>
          <Intro goToScreen={this.goToScreen} />
          {/* <Feedback /> */}
        </ScrollView>
      </View>
    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  newChallenge: PropTypes.shape({
    amount: PropTypes.number,
    category: PropTypes.string,
    checkingPeriod: PropTypes.number,
    createdAt: PropTypes.string,
    description: PropTypes.string,
    endAt: PropTypes.string,
    id: PropTypes.number,
    isOnGoing: PropTypes.bool,
    receipient_charity_id: PropTypes.number,
    receipient_user_id: PropTypes.number,
    refereeId: PropTypes.number,
    slogan: PropTypes.string,
    startAt: PropTypes.string,
    state: PropTypes.string,
    title: PropTypes.string,
    updatedAt: PropTypes.string,
    userId: PropTypes.number,
  }),
};

Home.defaultProps = {
  newChallenge: {},
};

const mapStateToProps = state => ({
  newChallenge: state.challenge.newChallenge,
});

export default createStackNavigator(
  {
    Home: {
      screen: connect(mapStateToProps)(Home),
      navigationOptions: {
        headerTitle: () => (
          <Text style={{ fontFamily: 'Fontrust', fontSize: 30 }}>Flint</Text>
        ),
      },
    },
    ChallengeSetting: {
      screen: ChallengeSetting,
      navigationOptions: {
        header: null,
      },
    },
    Payment: {
      screen: Payment,
      navigationOptions: {
        header: null,
      },
    },
    Success: {
      screen: Success,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
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
    initialRouteName: 'Home',
    navigationOptions: ({ navigation: { state } }) => ({
      tabBarVisible: !(state.index > 0),
    }),
  },
);
