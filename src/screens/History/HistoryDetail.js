import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';
import axios from 'axios';

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
      } = await axios.get(
        `http://127.0.0.1:3000/api/reports/getNotPendingReports/${id}`,
      );
      this.setState({ isLoading: true, reportList: reports || [] });
    } catch (err) {
      console.log(err.message);
    }
  };

  render = () => {
    const { isLoading, reportList } = this.state;
    const { navigation } = this.props;
    const { title } = navigation.getParam('detail');
    return isLoading ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Progress.Bar progress={0.8} width={width * 0.8} color="#ff6600" />
        </View>
        <View style={{ flex: 4 }}>
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
