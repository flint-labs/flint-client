import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  AsyncStorage,
} from 'react-native';
import { createStackNavigator, NavigationEvents } from 'react-navigation';
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles';
import RefereeEntry from './RefereeEntry';
import sendRequest from '../../modules/sendRequest';
import SignIn from '../SignIn';

const { width, height } = Dimensions.get('window');

class Referee extends Component {
  state = {
    reqData: [],
    isVisible: false,
    image: null,
    modalMessage: '',
    isLogin: null,
    requestReportId: null,
    nickname: '',
  };

  goToScreen = screenName => {
    const { navigation } = this.props;
    navigation.navigate(screenName);
  };

  componentDidMount = async () => {
    const { id } = JSON.parse(await AsyncStorage.getItem('userInfo'));
    try {
      const list = await sendRequest(
        'get',
        `/api/reports/getRequireList/${id}`,
      );

      this.setState({ reqData: list ? list.data : [] });
    } catch (error) {
      console.log('err');
    }
  };

  renderRefereeModal = (image, description, id, nickname) => {
    const { isVisible } = this.state;

    this.setState({
      isVisible: !isVisible,
      image,
      modalMessage: description,
      requestReportId: id,
      nickname,
    });
  };

  handleAccept = async () => {
    const { isVisible, requestReportId, reqData } = this.state;

    try {
      const { status } = await sendRequest(
        'post',
        '/api/reports/responseReport',
        null,
        {
          reportId: requestReportId,
          check: 'true',
        },
      );

      if (status === 200) {
        this.setState({
          isVisible: !isVisible,
          reqData: reqData.filter(ele => ele.id !== requestReportId),
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  handleReject = async () => {
    const { isVisible, requestReportId, reqData } = this.state;

    try {
      const { status } = await sendRequest(
        'post',
        '/api/reports/responseReport',
        null,
        {
          reportId: requestReportId,
          check: 'false',
        },
      );

      if (status === 200) {
        this.setState({
          isVisible: !isVisible,
          reqData: reqData.filter(ele => ele.id !== requestReportId),
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  renderModal = () => {
    const { isVisible, image, modalMessage, nickname } = this.state;
    return (
      <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(0, 0, 0, .5)"
        overlayBackgroundColor="white"
        width={width - 50}
        height={height - 80}
        style={{ flex: 1, alignItems: 'center' }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={{ width: width * 0.1, alignItems: 'center' }}
              onPress={() => {
                this.setState({ isVisible: false });
              }}
            >
              <Icon name="ios-close" size={40} style={{ color: 'black' }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ marginLeft: 10, fontSize: 30, fontWeight: '700' }}>
              {nickname}
            </Text>
            <Text>님 의 요청입니다.</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Image source={image} style={styles.refereeRequestImage} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.refereeRequestMessage}>
              <Text style={{ fontSize: 18 }}>{modalMessage}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => this.handleAccept()}
                style={[styles.refereeRequestButton, { borderColor: 'green' }]}
              >
                <Text style={{ fontSize: 15, color: 'green' }}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleReject()}
                style={[styles.refereeRequestButton, { borderColor: 'red' }]}
              >
                <Text style={{ fontSize: 15, color: 'red' }}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Overlay>
    );
  };

  handleWillFocus = async () => {
    try {
      const { id } = JSON.parse(await AsyncStorage.getItem('userInfo'));
      const list = await sendRequest(
        'get',
        `/api/reports/getRequireList/${id}`,
      );
      this.setState({ reqData: list ? list.data : [], isLogin: true });
    } catch (error) {
      this.setState({ reqData: [], isLogin: false });
    }
  };

  renderToSignInPage = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => this.goToScreen('SignIn')}>
        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>
          Flint 회원이신가요?
        </Text>
      </TouchableOpacity>
    </View>
  );

  renderInCondition = () => {
    const { isLogin, reqData } = this.state;
    if (isLogin) {
      if (reqData.length !== 0) {
        return (
          <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.container}>
                <FlatList
                  data={reqData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={itemData => (
                    <RefereeEntry
                      data={itemData.item}
                      modal={this.renderRefereeModal}
                    />
                  )}
                />
              </View>
              {this.renderModal()}
            </SafeAreaView>
          </View>
        );
      }
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 15, fontWeight: '500' }}>
            들어온 요청이 없습니다.
          </Text>
        </View>
      );
    }
    return this.renderToSignInPage();
  };

  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={this.handleWillFocus} />
        {this.renderInCondition()}
      </View>
    );
  };
}

export default createStackNavigator({
  Referee: {
    screen: Referee,
    navigationOptions: {
      headerTitle: () => (
        <Text style={{ fontFamily: 'Fontrust', fontSize: 30 }}>Flint</Text>
      ),
    },
  },

  SignIn: {
    screen: SignIn,
  },
});
