import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

const pass = require('../../../assets/images/History/pass.jpg');
const faile = require('../../../assets/images/History/faile.jpg');

const HistoryEntry = ({ data, handlePress }) => {
  const end = new Date(data.endAt);
  const start = new Date(data.startAt);
  const period = parseInt((end.getTime() - start.getTime()) / 604800000);

  return (
    <TouchableOpacity
      onPress={() => {
        handlePress('HistoryDetail', data);
      }}
    >
      <View style={styles.historyEntry}>
        <View style={styles.bodyContainer}>
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.descriptionText}>{period}주 도전</Text>
        </View>
        <View style={{ flex: 1 }}>
          {data.state === 'success' ? (
            <ImageBackground
              source={pass}
              style={{ flex: 1, transform: [{ rotateZ: '-0.3rad' }] }}
              imageStyle={{
                width: 110,
                resizeMode: 'contain',
              }}
            />
          ) : (
            <ImageBackground
              source={faile}
              style={{
                flex: 1,
                transform: [{ rotateZ: '-0.3rad' }],
              }}
              imageStyle={{ width: 110, resizeMode: 'contain' }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
HistoryEntry.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    state: PropTypes.bool,
  }).isRequired,
  handlePress: PropTypes.func.isRequired,
};

export default HistoryEntry;
