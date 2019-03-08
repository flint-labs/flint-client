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
import { createStackNavigator } from 'react-navigation';
import { Overlay } from 'react-native-elements';
import io from 'socket.io-client';
import axios from 'axios';

import styles from './Styles';
import RefereeEntry from './RefereeEntry';
import SignIn from '../SignIn';

const socket = io('http://13.209.19.196:3000');

const { width, height } = Dimensions.get('window');

class Referee extends Component {
  state = {
    reqData: [],
    isVisible: false,
    image: null,
    modalMessage: '',
    isLogin: false,
    requestReportId: null,
  };

  componentDidMount = async () => {
    const { reqData } = this.state;
    const { id } = JSON.parse(await AsyncStorage.getItem('userInfo'));
    socket.on(id, data => {
      console.log(data);
      this.setState({ reqData: [data, ...reqData] });
    });
    // this.props.navigation.addListener('didFocus', () => {});
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

  handleAccept = () => {
    const { isVisible, requestReportId, reqData } = this.state;

    try {
      const { status } = axios.post(
        'http://13.209.19.196:3000/api/reports/responseReport',
        {
          reportId: requestReportId,
          check: 'true',
        },
      );
      this.setState({
        isVisible: !isVisible,
        reqData: reqData.filter(ele => ele.id !== requestReportId),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  handleReject = () => {
    const { isVisible, requestReportId, reqData } = this.state;

    try {
      const { status } = axios.post(
        'http://13.209.19.196:3000/api/reports/responseReport',
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

  render = () => {
    const { reqData } = this.state;
    return (
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
});
