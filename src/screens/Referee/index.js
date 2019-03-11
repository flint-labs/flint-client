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

  renderRefereeModal = (image, description, id) => {
    const { isVisible } = this.state;

    this.setState({
      isVisible: !isVisible,
      image,
      modalMessage: description,
      requestReportId: id,
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

  renderModal = () => {
    const { isVisible, image, modalMessage } = this.state;
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
          <View
            style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}
          >
            <Image
              source={{ uri: image }}
              style={{
                flex: 1,
                width: width - 70,
                height: (height - 80) / 2,
                resizeMode: 'cover',
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 3,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>{modalMessage}</Text>
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
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'blue',
                  margin: 10,

                  borderWidth: 1,
                  borderColor: 'green',
                  borderRadius: 5,
                }}
              >
                <Text style={{ fontSize: 15, color: 'green' }}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleReject()}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'yellow',
                  margin: 10,

                  borderWidth: 1,
                  borderColor: 'red',
                  borderRadius: 5,
                }}
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

  renderToSignInPage = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => this.goToScreen('SignIn')}>
          <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>
            Flint 회원이신가요?
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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
          <Text> 요청이 모두 처리되었습니다. </Text>
        </View>
      );
    }
    return this.renderToSignInPage();
  };

  render = () => (
    <View style={{ flex: 1 }}>
      <NavigationEvents onWillFocus={this.handleWillFocus} />
      {this.renderInCondition()}
    </View>
  );
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
