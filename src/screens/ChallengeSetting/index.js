import React, { Component } from 'react';
import {
  View, Text, SafeAreaView, Picker, TextInput, Dimensions,
  TouchableOpacity, Alert, AsyncStorage, YellowBox, findNodeHandle, Image,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import PropTypes from 'prop-types';
import { AuthInput, OrangeButton } from '../../components';
import styles from './style';
import { numberWithCommas, reapeat } from '../../modules/util';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

const { width } = Dimensions.get('window');
const THIS_YEAR = new Date().getFullYear();
const THIS_MONTH = new Date().getMonth() + 1;
const TODAY = new Date().getDate();
const KAKAO_PAY_ICON = require('../../../assets/images/ChallengeSetting/kakao-icon.png');
const PAYPAL_ICON = require('../../../assets/images/ChallengeSetting/paypal-icon.png');

class ChallengeSetting extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity
        style={styles.headerLeftButton}
        onPress={navigation.getParam('handleBackButton') || navigation.goBack}
      >
        <Icon name="ios-arrow-round-back" size={35} />
      </TouchableOpacity>
    ),
    gesturesEnabled: false,
    headerStyle: { borderColor: 'white' },
  });

  state = {
    title: '',
    week: 1,
    startYear: THIS_YEAR,
    startMonth: THIS_MONTH,
    startDay: TODAY,
    isReferee: true,
    isSolo: false,
    referee: '',
    checkingPeriod: 1,
    category: '',
    amount: '',
    isFree: false,
    isOnGoing: true,
    slogan: '',
    selectCharity: '',
    selectUser: '',
    isKakao: false,
    isPaypal: false,
    page: 0,
    isValid: false,
    isValidUser: false,
    isFriend: false,
    isCompany: true,
    charities: [],
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    const { handleBackButton } = this;
    navigation.setParams({ handleBackButton });

    try {
      const charities = await axios.get('http://13.209.19.196:3000/api/challenges/charities');
      this.setState({
        charities: charities.data,
        category: navigation.getParam('category'),
      });
    } catch (error) {
      throw error;
    }
  };

  componentDidUpdate = async () => {
    const {
      page, referee, isValid, selectUser, isValidUser,
    } = this.state;

    if (page === 4 && referee !== '') {
      try {
        const { data: { isExist } } = await axios.get(`http://13.209.19.196:3000/api/users/checkNickname/${referee}`);
        if (isExist !== isValid) {
          this.setState({ isValid: isExist });
        }
      } catch (error) {
        throw error;
      }
    }

    if (page === 7 && selectUser !== '') {
      try {
        const { data: { isExist } } = await axios.get(`http://13.209.19.196:3000/api/users/checkNickname/${selectUser}`);
        if (isExist !== isValidUser) {
          this.setState({ isValidUser: isExist });
        }
      } catch (error) {
        throw error;
      }
    }
  };

  scrollToInput = node => {
    this.scroll.props.scrollToFocusedInput(node);
  }

  handleBackButton = () => {
    const { page } = this.state;
    const { navigation: { goBack } } = this.props;
    if (page > 0) this.setState({ page: page - 1 });
    else goBack();
  };

  renderIcon = ({ name, style }) => <Icon name={name} size={20} color="#333" style={style} />;

  renderChallengeType = () => {
    const { isOnGoing } = this.state;
    if (isOnGoing) {
      return (
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          {'꾸준한 도전입니다.\n ex) 매일 30분씩 운동하기'}
        </Text>
      );
    }
    return (
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
        {'한번에 이룰 수 있는 도전입니다.\n ex) 3월 중에 대청소 하기'}
      </Text>
    );
  }

  renderIsOnGoing = () => {
    const { isOnGoing } = this.state;
    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>어떤 종류의 도전인가요?</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center' }}>
          <View style={styles.pickerBox}>
            <CheckBox
              title="On Going!"
              checked={isOnGoing}
              onPress={() => this.setState({ isOnGoing: true })}
            />
            <CheckBox
              title="One Shot!"
              checked={!isOnGoing}
              onPress={() => this.setState({ isOnGoing: false })}
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            {this.renderChallengeType()}
          </View>
        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OrangeButton
            text="Next"
            onPress={() => this.buttonHandler()}
            marginTop={0}
          />
        </View>
      </View>
    );
  };

  renderTitleInputPart = () => {
    const { title } = this.state;
    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>당신의 도전은 무엇인가요?</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <AuthInput
            state={title}
            setState={text => this.setState({ title: text })}
            renderIcon={() => this.renderIcon({})}
            customProps={{
              returnKeyType: 'next',
              onSubmitEditing: this.buttonHandler,
              onFocus: event => this.scrollToInput(findNodeHandle(event.target)),
            }}
          />
        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OrangeButton
            text="Next"
            onPress={() => this.buttonHandler()}
            marginTop={0}
          />
        </View>
      </View>
    );
  }

  renderPeriodSelectPart = () => {
    const { week } = this.state;
    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>몇 주 동안 하실래요?</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={week}
              style={{ width: width * 0.2 }}
              onValueChange={itemValue => this.setState({ week: itemValue })}
            >
              {reapeat(24, (el, index) => {
                const value = (index + 1).toString();
                return <Picker.Item key={value} label={value} value={value} />;
              })}
            </Picker>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '500' }}> weeks</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OrangeButton
            text="Next"
            onPress={() => this.buttonHandler()}
            marginTop={0}
          />
        </View>
      </View>
    );
  }

  renderStartAtPart = () => {
    const { startYear, startMonth, startDay } = this.state;

    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>언제부터 시작할까요?</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>

          <View style={styles.pickerBox}>
            <Picker
              selectedValue={startYear}
              style={{ width: width * 0.2 }}
              onValueChange={itemValue => this.setState({ startYear: itemValue })}
            >
              {reapeat(2, (el, index) => {
                const value = (THIS_YEAR + index).toString();
                return <Picker.Item key={value} label={value} value={value} />;
              })}
            </Picker>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '500' }}> 년</Text>
            </View>
            <Picker
              selectedValue={startMonth}
              style={{ width: width * 0.2 }}
              onValueChange={itemValue => this.setState({ startMonth: itemValue })}
            >
              {reapeat(12, (el, index) => {
                const value = (index + 1).toString();
                return <Picker.Item key={value} label={value} value={value} />;
              })}
            </Picker>

            <View>
              <Text style={{ fontSize: 20, fontWeight: '500' }}> 월</Text>
            </View>

            <Picker
              selectedValue={startDay}
              style={{ width: width * 0.2 }}
              onValueChange={itemValue => this.setState({ startDay: itemValue })}
            >
              {reapeat(30, (el, index) => {
                const value = (index + 1).toString();
                return <Picker.Item key={value} label={value} value={value} />;
              })}
            </Picker>

            <View>
              <Text style={{ fontSize: 20, fontWeight: '500' }}> 일</Text>
            </View>
          </View>

        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OrangeButton
            text="Next"
            onPress={() => this.buttonHandler()}
            marginTop={0}
          />
        </View>
      </View>
    );
  }

  renderModePart = () => {
    const {
      isReferee, isSolo, isValid, referee,
    } = this.state;

    const toggleCheckBox = () => {
      this.setState({
        isSolo: !isSolo,
        isReferee: !isReferee,
      });
    };

    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>어떤 모드로 진행할까요?</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>

          <View style={{ ...styles.pickerBox, flex: 1 }}>
            <CheckBox
              title="Solo"
              checked={isSolo}
              onPress={toggleCheckBox}
            />
            <CheckBox
              title="Referee"
              checked={isReferee}
              onPress={toggleCheckBox}
            />
          </View>

          <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
            {isSolo ? (
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                {'스스로 진행 상황을 체크합니다.'}
              </Text>
            ) : (
              <View>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                  {'심판으로 등록된 사용자가 체크합니다.'}
                </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.setState({ referee: text })}
                  blurOnSubmit={false}
                  value={referee}
                  returnKeyType="next"
                  placeholder="심판 아이디"
                  onSubmitEditing={this.buttonHandler}
                  onFocus={event => this.scrollToInput(findNodeHandle(event.target))}
                />
                {isValid ? (
                  <Text style={{ fontSize: 12, color: 'green', marginTop: 6 }}>
                    {referee !== '' ? '훌륭한 심판이십니다.' : ' '}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 12, color: 'red', marginTop: 6 }}>
                    {referee !== '' ? '등록되지않은 아이디 입니다.' : ' '}
                  </Text>
                )}
              </View>
            )}
          </View>

        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OrangeButton
            text="Next"
            onPress={() => this.buttonHandler()}
            marginTop={0}
          />
        </View>
      </View>
    );
  };

  renderCheckingPeriodPart = () => {
    const { checkingPeriod } = this.state;
    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>일주일에 몇 번 체크할까요?</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>

          <View style={styles.pickerBox}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '500' }}>주 </Text>
            </View>
            <Picker
              selectedValue={checkingPeriod}
              style={{ width: width * 0.3 }}
              onValueChange={itemValue => this.setState({ checkingPeriod: itemValue })}
            >
              {reapeat(7, (el, index) => {
                const value = (index + 1).toString();
                return <Picker.Item key={value} label={value} value={value} />;
              })}
            </Picker>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '500' }}> 회</Text>
            </View>
          </View>

        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OrangeButton
            text="Next"
            onPress={() => this.buttonHandler()}
            marginTop={0}
          />
        </View>
      </View>
    );
  }

  renderAmountPart = () => {
    const { isFree, amount } = this.state;
    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>얼마를 묶어 둘까요?</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={styles.textInput}
            placeholder="금액(원)"
            onChangeText={text => this.setState({ amount: text })}
            blurOnSubmit={false}
            value={numberWithCommas(amount)}
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={this.buttonHandler}
            onFocus={event => this.scrollToInput(findNodeHandle(event.target))}
          />
          <View style={{ width: width * 0.8 }}>
            <CheckBox
              title="💪의지로만 하기"
              containerStyle={{
                backgroundColor: 'rgba(0,0,0,0)',
                borderWidth: 0,
              }}
              checked={isFree}
              onPress={() => this.setState({ isFree: !isFree, amount: '0' })}
            />
          </View>

        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OrangeButton
            text="Next"
            onPress={() => this.buttonHandler()}
            marginTop={0}
          />
        </View>
      </View>
    );
  };

  renderSloganPart = () => {
    const { slogan } = this.state;
    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>각오 한마디</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ slogan: text })}
            blurOnSubmit={false}
            value={slogan}
            returnKeyType="next"
            onSubmitEditing={this.buttonHandler}
            onFocus={event => this.scrollToInput(findNodeHandle(event.target))}
          />
        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OrangeButton
            text="Next"
            onPress={() => this.buttonHandler()}
            marginTop={0}
          />
        </View>
      </View>
    );
  }

  renderReceipientPart = () => {
    const {
      isFriend,
      isCompany,
      selectCharity,
      isValidUser,
      selectUser,
      // charities,
    } = this.state;
    const toggleCheckBox = () => {
      this.setState({
        isFriend: !isFriend,
        isCompany: !isCompany,
      });
    };

    const charities = [{ name: '김선재', id: 1 }, { name: '박준홍', id: 2 }, { name: '유건', id: 3 }, { name: '박지혜', id: 4 }];

    return (

      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>만약 실패한다면 누구에게 보낼까요?</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>

          <View style={{ ...styles.pickerBox, flex: 2, marginTop: 20 }}>
            <CheckBox
              title="친구"
              checked={isFriend}
              onPress={toggleCheckBox}
            />
            <CheckBox
              title="자선단체"
              checked={isCompany}
              onPress={toggleCheckBox}
            />
          </View>
          <View style={{ alignItems: 'center', flex: 7 }}>
            {isFriend ? (
              <View style={{ marginTop: 30 }}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.setState({ selectUser: text })}
                  blurOnSubmit={false}
                  value={selectUser}
                  returnKeyType="next"
                  onSubmitEditing={this.buttonHandler}
                  onFocus={event => this.scrollToInput(findNodeHandle(event.target))}
                />
                {isValidUser ? (
                  <Text style={{ fontSize: 12, color: 'green', marginTop: 6 }}>
                    {selectUser !== '' ? '유효한 아이디 입니다.' : ' '}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 12, color: 'red', marginTop: 6 }}>
                    {selectUser !== '' ? '등록되지않은 아이디 입니다.' : ' '}
                  </Text>
                )}
              </View>
            ) : (
              <View style={{ alignItems: 'center' }}>
                <Picker
                  selectedValue={selectCharity}
                  style={{ width: width * 0.7 }}
                  onValueChange={itemValue => this.setState({ selectCharity: itemValue })}
                >
                  {charities.map(value => (
                    <Picker.Item
                      key={value.name}
                      label={value.name}
                      value={value.id}
                    />
                  ))}
                </Picker>
              </View>
            )}
          </View>

        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OrangeButton
            text="Next"
            onPress={() => this.buttonHandler()}
            marginTop={0}
          />
        </View>
      </View>
    );
  };

  renderSelectPaymentMethodIcon = () => {
    const { isKakao, isPaypal } = this.state;

    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 20 }}>결제수단을 선택해주세요</Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>

          <View style={styles.paymentMethodBox}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={KAKAO_PAY_ICON}
                style={styles.paymentIcon}
              />
              <CheckBox
                title="Kakao Pay"
                checked={isKakao}
                onPress={() => this.setState({ isKakao: true, isPaypal: false })}
              />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={PAYPAL_ICON}
                style={styles.paymentIcon}
              />
              <CheckBox
                title="Paypal"
                checked={isPaypal}
                onPress={() => this.setState({ isKakao: false, isPaypal: true })}
              />
            </View>
          </View>

        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OrangeButton
            text="Next"
            onPress={() => this.buttonHandler()}
            marginTop={0}
          />
        </View>
      </View>
    );
  }

  renderStartChallengePart = () => (
    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text style={{ fontSize: 20 }}>Challenge Your Life</Text>
      </View>
      <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }} />
      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start' }}>
        <OrangeButton
          text="Next"
          onPress={() => this.buttonHandler()}
          marginTop={0}
        />
      </View>
    </View>
  )

  getChallenge = () => {
    const challenge = { ...this.state };
    delete challenge.page;
    delete challenge.isFree;
    delete challenge.isOneShot;
    delete challenge.isSolo;
    delete challenge.isReferee;
    delete challenge.isValid;
    delete challenge.referee;
    delete challenge.charities;
    delete challenge.isValidUser;
    delete challenge.isFriend;
    delete challenge.isCompany;
    delete challenge.selectUser;
    delete challenge.selectCharity;
    return challenge;
  }

  handleChallengeSettingSubmit = async () => {
    const { selectCharity, selectUser, referee } = this.state;
    const challenge = this.getChallenge();

    const check = Object.values(challenge);
    const challKey = Object.keys(challenge);
    const result = {};

    result.selectCharity = selectCharity || false;
    result.selectUser = selectUser || false;

    challKey.forEach((ele, idx) => {
      result[ele] = check[idx];
    });
    result.referee = referee;

    try {
      const { id } = JSON.parse(await AsyncStorage.getItem('userInfo'));
      result.userId = id;
    } catch (err) {
      Alert.alert('AsyncStorage error');
    }

    try {
      // TODO `sendRequest` 모듈로 변경
      await axios.post(
        'http://13.209.19.196:3000/api/challenges/setting',
        result,
      );
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  buttonHandler = async () => {
    const {
      page, amount, isKakao, isPaypal,
    } = this.state;
    const { navigation } = this.props;
    if (page < 9) {
      if (amount === 0) {
        await this.handleChallengeSettingSubmit();
        navigation.state.params.setting();
        navigation.popToTop();
      }
      this.setState({ page: page + 1 });
    } else if (amount > 0) {
      if (!(isPaypal || isKakao)) this.setState({ page: page + 1 });
      else {
        navigation.navigate('Payment', {
          setting: navigation.state.params.setting,
          amount,
          isKakao,
        });
      }
    } else {
      navigation.state.params.setting();
      navigation.popToTop();
    }
  };

  render = () => {
    const {
      week,
      page,
      checkingPeriod,
      amount,
      slogan,
    } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
          enableAutomaticScroll
          extraHeight={235}
          innerRef={ref => {
            this.scroll = ref;
          }}
        >
          {page === 0 && this.renderIsOnGoing()}
          {page === 1 && this.renderTitleInputPart()}
          {page === 2 && this.renderPeriodSelectPart(week)}
          {page === 3 && this.renderStartAtPart()}
          {page === 4 && this.renderModePart()}
          {page === 5 && this.renderCheckingPeriodPart(checkingPeriod)}
          {page === 6 && this.renderAmountPart(amount)}
          {page === 7 && this.renderReceipientPart()}
          {page === 8 && this.renderSloganPart(slogan)}
          {page === 9 && this.renderStartChallengePart()}
          {page === 10 && this.renderSelectPaymentMethodIcon()}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  };
}

ChallengeSetting.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};

export default ChallengeSetting;
