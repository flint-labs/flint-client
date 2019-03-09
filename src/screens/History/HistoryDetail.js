import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';
import sendRequest from '../../modules/sendRequest';

import HistoryReportEntry from './HistoryReportEntry';

import styles from './style';

const { width } = Dimensions.get('window');

class HistoryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="ios-arrow-round-back" size={35} />
        </TouchableOpacity>
      ),
      headerStyle: {
        borderColor: 'white',
      },
    };
  };

  state = {
    reportList: [],
    isLoading: false,
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    const { id } = navigation.getParam('detail');

    try {
      const {
        data: { reports },
      } = await sendRequest('get', `/api/reports/getReports/${id}`);
      this.setState({ isLoading: true, reportList: reports || [] });
    } catch (err) {
      console.log(err.message);
    }
  };

  render = () => {
    const { isLoading, reportList } = this.state;
    const { navigation } = this.props;
    const { title } = navigation.getParam('detail');
    const info = navigation.getParam('detail');
    console.log(info);
    return isLoading ? (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={{
              flex: 2,
              marginLeft: 20,
              backgroundColor: 'white',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: '600' }}>{title}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'white',
              marginLeft: 20,
            }}
          >
            <Text>달성률</Text>
            <Text style={{ fontSize: 50, fontWeight: '700' }}>84%</Text>
          </View>
        </View>

        <View style={{ flex: 4, marginTop: 40 }}>
          <Carousel
            layout="stack"
            swipeThreshold={5}
            data={reportList}
            renderItem={({ item }) => <HistoryReportEntry data={item} />}
            sliderWidth={width}
            itemWidth={width * 0.8}
          />
        </View>
      </View>
    ) : (
      <View>
        <Text>Loading</Text>
      </View>
    );
  };
}

export default HistoryDetail;
