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
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthInput, OrangeButton } from '../../components';

const { width } = Dimensions.get('window');
const thisYear = new Date().getFullYear();

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
    };
  };

  state = {
    page: 0,
    title: '',
    startYear: '',
    startMonth: '',
    startDay: '',
    week: null,
    checkingPeriod: '',
    category: null,
    amount: '',
    isFree: false,
    description: null,
    isOnGoing: false,
    isOneShot: false,
    slogan: '',
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

  componentDidMount = () => {
    const { navigation } = this.props;
    navigation.setParams({
      handleBackButton: this.handleBackButton,
    });
  };

  numberWithCommas = x => {
    const temp = x.split(',').join('');
    return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  renderIcon = ({ name, style }) => (
    <Icon name={name} size={20} color="#333" style={style} />
  );

  renderIsOnGoing = () => (
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
          checked={this.state.isOnGoing}
          onPress={() =>
            this.setState({
              isOnGoing: !this.state.isOnGoing,
              isOneShot: this.state.isOnGoing,
            })
          }
        />
        <CheckBox
          title="One Shot!"
          checked={this.state.isOneShot}
          onPress={() =>
            this.setState({
              isOneShot: !this.state.isOneShot,
              isOnGoing: this.state.isOneShot,
            })
          }
        />
      </View>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        {!this.state.isOnGoing && !this.state.isOneShot ? (
          <Text />
        ) : this.state.isOnGoing ? (
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            {`꾸준한 도전입니다.\n ex) 매일 30분씩 운동하기`}
          </Text>
        ) : (
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            {`한번에 이룰 수 있는 도전입니다.\n ex) 3월 중에 대청소 하기`}
          </Text>
        )}
      </View>
    </View>
  );

  renderIsAmount = () => (
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
          checked={this.state.isOnGoing}
          onPress={() =>
            this.setState({
              isOnGoing: !this.state.isOnGoing,
              isOneShot: this.state.isOnGoing,
            })
          }
        />
        <CheckBox
          title="One Shot!"
          checked={this.state.isOneShot}
          onPress={() =>
            this.setState({
              isOneShot: !this.state.isOneShot,
              isOnGoing: this.state.isOneShot,
            })
          }
        />
      </View>
    </View>
  );

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
        }}
      >
        <Picker
          selectedValue={week}
          style={{ width: width * 0.7 }}
          onValueChange={itemValue => this.setState({ week: itemValue })}
        >
          {new Array(24).fill(null).map((el, index) => {
            const value =
              index === 0 ? `${index + 1}  week` : `${index + 1}  weeks`;
            return <Picker.Item key={value} label={value} value={value} />;
          })}
        </Picker>
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
          style={{ width: width * 0.3 }}
          onValueChange={itemValue => this.setState({ startYear: itemValue })}
        >
          {new Array(2).fill(null).map((el, index) => {
            const value = `${thisYear + index} 년`;
            return <Picker.Item key={value} label={value} value={value} />;
          })}
        </Picker>

        <Picker
          selectedValue={startMonth}
          style={{ width: width * 0.3 }}
          onValueChange={itemValue => this.setState({ startMonth: itemValue })}
        >
          {new Array(12).fill(null).map((el, index) => {
            const value = `${index + 1} 월`;
            return <Picker.Item key={value} label={value} value={value} />;
          })}
        </Picker>

        <Picker
          selectedValue={startDay}
          style={{ width: width * 0.3 }}
          onValueChange={itemValue => this.setState({ startDay: itemValue })}
        >
          {new Array(30).fill(null).map((el, index) => {
            const value = `${index + 1} 일`;
            return <Picker.Item key={value} label={value} value={value} />;
          })}
        </Picker>
      </View>
    </View>
  );

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

  renderAmountPart = amount => (
    <View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 25 }}>💰얼마를 묶어 둘까요?💸</Text>
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
            checked={this.state.isFree}
            onPress={() =>
              this.setState({ isFree: !this.state.isFree, amount: '0' })
            }
          />
        </View>
      </View>
    </View>
  );

  renderSloganPart = slogan => (
    <View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 25 }}> 🎙각오 한마디🎙</Text>
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
            {page === 4 && this.renderCheckingPeriodPart(checkingPeriod)}
            {page === 5 && this.renderAmountPart(amount)}
            {page === 6 && this.renderSloganPart(slogan)}
            {page === 7 && this.renderStartChallengePart()}

            <View style={{ alignItems: 'center' }}>
              <OrangeButton
                text={page === 7 ? 'Start' : 'Next'}
                onPress={() => {
                  page < 7
                    ? this.setState({ page: page + 1 })
                    : this.props.navigation.navigate('Dashboard');
                }}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  };
}

export default ChallengeSetting;
