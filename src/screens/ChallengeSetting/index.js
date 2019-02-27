import React, { Component } from 'react';
import {
  View,
  Text,
  findNodeHandle,
  SafeAreaView,
  Picker,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthInput, OrangeButton } from '../../components';

const { width } = Dimensions.get('window');

class ChallengeSetting extends Component {
  state = {
    page: 0,
    title: '',
    startAt: '',
    week: null,
    checkingPeriod: null,
    category: null,
    amount: null,
    description: null,
    isOnGoing: true,
    slogan: null,
  };

  scrollToInput(node) {
    this.scroll.props.scrollToFocusedInput(node);
  }

  renderIcon = ({ name, style }) => (
    <Icon name={name} size={20} color="#333" style={style} />
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

  renderStartAtPart = startAt => (
    <View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20 }}>🏃‍♂️언제부터 시작하실래요? 🏃‍♂️</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <AuthInput
          state={startAt}
          setState={text => this.setState({ startAt: text })}
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

  render = () => {
    const { title, week, page, startAt } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/*
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
          enableAutomaticScroll
          extraHeight={180}
          innerRef={ref => {
            this.scroll = ref;
          }}
        >
      */}
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          {page === 0 && this.renderTitleInputPart(title)}
          {page === 1 && this.renderPeriodSelectPart(week)}
          {page === 2 && this.renderStartAtPart(startAt)}
          <View style={{ alignItems: 'center' }}>
            <OrangeButton
              text="Next"
              onPress={() => {
                this.setState({ page: page + 1 });
              }}
            />
          </View>
        </View>
        {/*</KeyboardAwareScrollView>*/}
      </SafeAreaView>
    );
  };
}

export default ChallengeSetting;
