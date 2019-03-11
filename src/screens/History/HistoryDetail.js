import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import sendRequest from '../../modules/sendRequest';

import HistoryReportEntry from './HistoryReportEntry';
import styles from './style';

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
    progress: 0,
  };

  calculateProgress = async () => {
    const { challenge, reportList } = this.state;
    const week =
      (new Date(challenge.endAt) - new Date(challenge.startAt)) /
      (86400000 * 7);
    const result = await (reportList.filter(el => el.isConfirmed === 'true')
      .length /
      (week * challenge.checkingPeriod));
    return result;
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    const { id } = navigation.getParam('detail');

    try {
      const {
        data: { reports },
      } = await sendRequest('get', `/api/reports/getReports/${id}`);

      this.setState({
        isLoading: true,
        reportList: reports || [],
        challenge: navigation.getParam('detail'),
      });

      const progress = await this.calculateProgress();
      this.setState({
        progress,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  headerComponent = (title, period, progress) => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View style={styles.HistoryDetailTitle}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '600',
            marginBottom: 20,
            marginLeft: 20,
          }}
        >
          {title}
        </Text>
      </View>
      <View style={styles.HistoryDetailSubContainer}>
        <View
          style={{
            flex: 1,
            borderRightWidth: 1,
            borderColor: '#d3d3d3',
          }}
        >
          <View style={styles.subContainerEntry}>
            <Text>도전기간</Text>
            <Text style={{ fontSize: 30, fontWeight: '600' }}>{period} 주</Text>
          </View>
        </View>
        <View style={styles.subContainerEntry}>
          <Text>달성률</Text>
          <Text style={{ fontSize: 30, fontWeight: '600' }}>
            {(progress * 100).toFixed(1)}%
          </Text>
        </View>
      </View>
    </View>
  );

  render = () => {
    const { isLoading, reportList, progress } = this.state;
    const { navigation } = this.props;
    const { title } = navigation.getParam('detail');
    const period = navigation.getParam('period');

    return isLoading ? (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ flex: 4, marginTop: 20 }}>
          <FlatList
            layout="stack"
            data={reportList}
            stickyHeaderIndices={[0]}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={this.headerComponent(title, period, progress)}
            renderItem={({ item }) => <HistoryReportEntry data={item} />}
          />
        </View>
      </View>
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  };
}

HistoryDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HistoryDetail;
