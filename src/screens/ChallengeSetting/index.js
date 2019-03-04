import React, { Component } from 'react';
import {
  View,
  Text,
  findNodeHandle,
  SafeAreaView,
  Picker,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { StackActions } from 'react-navigation';

import { AuthInput, OrangeButton } from '../../components';

const { width } = Dimensions.get('window');
const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth() + 1;
const thisDate = new Date().getDate();

class ChallengeSetting extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            alignItems: 'center',
          }}
          onPress={navigation.getParam('handleBackButton') || navigation.goBack}
        >
          <Icon name="ios-arrow-round-back" size={35} />
        </TouchableOpacity>
      ),
      gesturesEnabled: false,
      headerStyle: {
        borderColor: 'white',
      },
    };
  };

  state = {
    page: 0,
    title: '',
    startYear: thisYear,
    startMonth: thisMonth,
    startDay: thisDate,
    week: 1,
    isReferee: true,
    isSolo: false,
    referee: '',
    isValid: false,
    checkingPeriod: 1,
    category: this.props.navigation.getParam('category'),
    amount: '',
    isFree: false,
    // description: '',
    isOnGoing: true,
    isOneShot: false,
    slogan: '',
    charities: [],
    selectCharity: '',
    selectUser: '',
    isValidUser: false,
    isFriend: false,
    isCompany: true,
  };

  componentDidMount = async () => {
    const { navigation } = this.props;

    navigation.setParams({
      handleBackButton: this.handleBackButton,
    });

    try {
      const charities = await axios.get(
        'http://13.209.19.196:3000/api/challenges/charities',
      );

      this.setState({ charities: charities.data });
    } catch (err) {
      throw err;
    }
  };

  componentDidUpdate = async () => {
    const { page, referee, isValid, selectUser, isValidUser } = this.state;

    if (page === 4 && referee !== '') {
      try {
        const {
          data: { isExist },
        } = await axios.get(
          `http://13.209.19.196:3000/api/users/checkNickname/${referee}`,
        );
        if (isExist !== isValid) {
          this.setState({ isValid: isExist });
        }
      } catch (err) {
        throw err;
      }
    }

    if (page === 7 && selectUser !== '') {
      try {
        const {
          data: { isExist },
        } = await axios.get(
          `http://13.209.19.196:3000/api/users/checkNickname/${selectUser}`,
        );
        if (isExist !== isValidUser) {
          this.setState({ isValidUser: isExist });
        }
      } catch (err) {
        throw err;
      }
    }
  };

  scrollToInput(node) {
    this.scroll.props.scrollToFocusedInput(node);
  }

  handleBackButton = () => {
    const { page } = this.state;
    const {
      navigation: { goBack },
    } = this.props;
    if (page > 0) this.setState({ page: page - 1 });
    else goBack();
  };

  numberWithCommas = x => {
    const temp = x.split(',').join('');
    return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  renderIcon = ({ name, style }) => (
    <Icon name={name} size={20} color="#333" style={style} />
  );

  renderIsOnGoing = () => {
    const { isOnGoing, isOneShot } = this.state;
    return (
      <View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>🏆 어떤 종류의 도전인가요? 🏆</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
          }}
        >
          <CheckBox
            title="On Going!"
            checked={isOnGoing}
            onPress={() =>
              this.setState({ isOnGoing: !isOnGoing, isOneShot: isOnGoing })
            }
          />
          <CheckBox
            title="One Shot!"
            checked={isOneShot}
            onPress={() =>
              this.setState({ isOneShot: !isOneShot, isOnGoing: isOneShot })
            }
          />
        </View>

        <View style={{ alignItems: 'center', marginTop: 10 }}>
          {!isOnGoing && !isOneShot ? (
            <Text />
          ) : isOnGoing ? (
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              {'꾸준한 도전입니다.\n ex) 매일 30분씩 운동하기'}
            </Text>
          ) : (
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              {'한번에 이룰 수 있는 도전입니다.\n ex) 3월 중에 대청소 하기'}
            </Text>
          )}
        </View>
      </View>
    );
  };

  renderTitleInputPart = title => (
    <View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20 }}>🏆 당신의 도전은 무엇인가요? 🏆</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <AuthInput
          state={title}
          setState={text => this.setState({ title: text })}
          renderIcon={() => this.renderIcon({})}
          customProps={{
            returnKeyType: 'next',
            // onSubmitEditing: () => this.secondTextInput.focus(),
            // onFocus: event => this.scrollToInput(findNodeHandle(event.target)),
          }}
        />
      </View>
    </View>
  );

  renderPeriodSelectPart = week => (
    <View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20 }}>📆 몇 주 동안 하실래요? 📆</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Picker
          selectedValue={week}
          style={{ width: width * 0.2 }}
          onValueChange={itemValue => this.setState({ week: itemValue })}
        >
          {new Array(24).fill(null).map((el, index) => {
            const value = (index + 1).toString();
            return <Picker.Item key={value} label={value} value={value} />;
          })}
        </Picker>
        <View>
          <Text style={{ fontSize: 20, fontWeight: '500' }}> weeks</Text>
        </View>
      </View>
    </View>
  );

  renderStartAtPart = (startYear, startMonth, startDay) => (
    <View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20 }}>🏃‍♂️언제부터 시작할까요?🏃‍♂️</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <Picker
          selectedValue={startYear}
          style={{ width: width * 0.2 }}
          onValueChange={itemValue => this.setState({ startYear: itemValue })}
        >
          {new Array(2).fill(null).map((el, index) => {
            const value = (thisYear + index).toString();
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
          {new Array(12).fill(null).map((el, index) => {
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
          {new Array(30).fill(null).map((el, index) => {
            const value = (index + 1).toString();
            return <Picker.Item key={value} label={value} value={value} />;
          })}
        </Picker>

        <View>
          <Text style={{ fontSize: 20, fontWeight: '500' }}> 일</Text>
        </View>
      </View>
    </View>
  );

  renderModePart = () => {
    const { isReferee, isSolo, isValid, referee } = this.state;

    return (
      <View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>👀 어떤 모드로 진행할까요? 👀 </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
          }}
        >
          <CheckBox
            title="Solo"
            checked={isSolo}
            onPress={() =>
              this.setState({
                isSolo: !isSolo,
                isReferee: isSolo,
              })
            }
          />
          <CheckBox
            title="Referee"
            checked={isReferee}
            onPress={() =>
              this.setState({
                isReferee: !isReferee,
                isSolo: isReferee,
              })
            }
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
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
                style={{
                  width: width * 0.7,
                  fontSize: 25,
                  marginTop: 40,
                  paddingBottom: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: '#333',
                }}
                onChangeText={text => this.setState({ referee: text })}
                blurOnSubmit={false}
                value={referee}
                returnKeyType="next"
                placeholder="심판 아이디"
                // onSubmitEditing: () => this.secondTextInput.focus(),
                // onFocus: event => this.scrollToInput(findNodeHandle(event.target)),
              />
              {isValid ? (
                <Text style={{ fontSize: 12, color: 'green', marginTop: 6 }}>
                  훌륭한 심판이십니다.
                </Text>
              ) : (
                <Text style={{ fontSize: 12, color: 'red', marginTop: 6 }}>
                  등록되지않은 아이디 입니다.
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  renderCheckingPeriodPart = checkingPeriod => (
    <View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20 }}>✔️ 일주일에 몇 번 체크할까요? ✔️</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <View>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>주 </Text>
        </View>
        <Picker
          selectedValue={checkingPeriod}
          style={{ width: width * 0.2 }}
          onValueChange={itemValue =>
            this.setState({ checkingPeriod: itemValue })
          }
        >
          {new Array(7).fill(null).map((el, index) => {
            const value = (index + 1).toString();
            return <Picker.Item key={value} label={value} value={value} />;
          })}
        </Picker>
        <View>
          <Text style={{ fontSize: 20, fontWeight: '500' }}> 회</Text>
        </View>
      </View>
    </View>
  );

  renderAmountPart = amount => {
    const { isFree } = this.state;
    return (
      <View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>💰얼마를 묶어 둘까요?💸</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <TextInput
            style={{
              width: width * 0.7,
              fontSize: 25,
              marginTop: 40,
              paddingBottom: 5,
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            }}
            placeholder="금액(원)"
            onChangeText={text => this.setState({ amount: text })}
            blurOnSubmit={false}
            value={this.numberWithCommas(amount)}
            keyboardType="numeric"
            returnKeyType="next"
            // onSubmitEditing: () => this.secondTextInput.focus(),
            // onFocus: event => this.scrollToInput(findNodeHandle(event.target)),
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
      </View>
    );
  };

  renderSloganPart = slogan => (
    <View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20 }}> 🎙각오 한마디🎙</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{
            width: width * 0.7,
            fontSize: 25,
            marginTop: 40,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#333',
          }}
          onChangeText={text => this.setState({ slogan: text })}
          blurOnSubmit={false}
          value={slogan}
          returnKeyType="next"
          // onSubmitEditing: () => this.secondTextInput.focus(),
          // onFocus: event => this.scrollToInput(findNodeHandle(event.target)),
        />
      </View>
    </View>
  );

  renderReceipientPart = () => {
    const {
      isFriend,
      isCompany,
      selectCharity,
      isValidUser,
      selectUser,
      charities,
    } = this.state;
    return (
      <View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>
            💸만약 실패한다면 누구에게 보낼까요?💸
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
          }}
        >
          <CheckBox
            title="친구"
            checked={isFriend}
            onPress={() =>
              this.setState({
                isFriend: !isFriend,
                isCompany: isFriend,
              })
            }
          />
          <CheckBox
            title="자선단체"
            checked={isCompany}
            onPress={() =>
              this.setState({
                isCompany: !isCompany,
                isFriend: isCompany,
              })
            }
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          {isFriend ? (
            <View>
              <TextInput
                style={{
                  width: width * 0.7,
                  fontSize: 25,
                  marginTop: 40,
                  paddingBottom: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: '#333',
                }}
                onChangeText={text => this.setState({ selectUser: text })}
                blurOnSubmit={false}
                value={selectUser}
                returnKeyType="next"
                // onSubmitEditing: () => this.secondTextInput.focus(),
                // onFocus: event => this.scrollToInput(findNodeHandle(event.target)),
              />
              {isValidUser ? (
                <Text style={{ fontSize: 12, color: 'green', marginTop: 6 }}>
                  유효한 아이디 입니다.
                </Text>
              ) : (
                <Text style={{ fontSize: 12, color: 'red', marginTop: 6 }}>
                  등록되지않은 아이디 입니다.
                </Text>
              )}
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <Picker
                selectedValue={selectCharity}
                style={{ width: width * 0.7 }}
                onValueChange={itemValue =>
                  this.setState({ selectCharity: itemValue })
                }
              >
                {charities.map(ele => {
                  const value = ele;
                  return (
                    <Picker.Item
                      key={value.name}
                      label={value.name}
                      value={value.id}
                    />
                  );
                })}
              </Picker>
            </View>
          )}
        </View>
      </View>
    );
  };

  renderStartChallengePart = () => (
    <View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 40, fontFamily: 'Fontrust' }}>
          {' '}
          Change Your Life
        </Text>
      </View>
    </View>
  );

  handleChallengeSettingSubmit = async () => {
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

    const check = Object.values(challenge);
    const challKey = Object.keys(challenge);
    const result = {};
    let accessToken;

    const selectCharity = this.state.selectCharity || false;
    const selectUser = this.state.selectUser || false;

    result.selectCharity = selectCharity;
    result.selectUser = selectUser;

    for (const value of check) {
      if (value === '') {
        Alert.alert('⚠️\n입력하지 않은 항목이 있습니다.');
        console.log(challenge);
        return false;
      }
    }

    challKey.forEach((ele, idx) => {
      result[ele] = check[idx];
    });
    result.referee = this.state.referee;

    try {
      // accessToken = await AsyncStorage.getItem('access');
      // const { id } = JSON.parse(await AsyncStorage.getItem('user'));
      result.userId = 7; //temp id
    } catch (err) {
      Alert.alert('AsyncStorage error');
    }

    try {
      await axios.post('13.209.19.196:3000/api/challenges/setting', result);
    } catch (err) {
      Alert.alert(err.message);
      return false;
    }

    return true;
  };

  buttonHandler = async () => {
    const { page } = this.state;
    const { navigation } = this.props;
    if (page < 9) {
      this.setState({ page: page + 1 });
    } else if (await this.handleChallengeSettingSubmit()) {
      navigation.navigate('Dashboard');
    }
  };

  render = () => {
    const {
      title,
      week,
      page,
      startYear,
      startMonth,
      startDay,
      checkingPeriod,
      amount,
      slogan,
    } = this.state;
    const { navigation } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
          enableAutomaticScroll
          extraHeight={180}
          innerRef={ref => {
            this.scroll = ref;
          }}
        >
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            {page === 0 && this.renderIsOnGoing()}
            {page === 1 && this.renderTitleInputPart(title)}
            {page === 2 && this.renderPeriodSelectPart(week)}
            {page === 3 &&
              this.renderStartAtPart(startYear, startMonth, startDay)}
            {page === 4 && this.renderModePart()}
            {page === 5 && this.renderCheckingPeriodPart(checkingPeriod)}
            {page === 6 && this.renderAmountPart(amount)}
            {page === 7 && this.renderReceipientPart()}
            {page === 8 && this.renderSloganPart(slogan)}
            {page === 9 && this.renderStartChallengePart()}

            <View style={{ alignItems: 'center' }}>
              <OrangeButton
                text={page === 9 ? 'Start' : 'Next'}
                onPress={() => this.buttonHandler()}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  };
}

export default ChallengeSetting;
