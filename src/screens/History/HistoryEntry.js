import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

const HistoryEntry = ({ data, handlePress }) => {
  const end = new Date(data.endAt);
  const start = new Date(data.startAt);
  const period = parseInt((end.getTime() - start.getTime()) / 604800000);

  return (
    <TouchableOpacity
      onPress={() => {
        handlePress('HistoryDetail', data, period);
      }}
    >
      <View style={styles.historyEntry}>
        <View style={styles.bodyContainer}>
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.descriptionText}>{period}주 도전</Text>
        </View>
        <View style={{ flex: 1 }}>
          {data.state === 'success' ? (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: 'Fontrust',
                    fontSize: 35,
                    color: 'green',
                  }}
                >
                  Success
                </Text>
              </View>
            </View>
          ) : (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{ fontFamily: 'Fontrust', fontSize: 35, color: 'red' }}
                >
                  Failure
                </Text>
              </View>
            </View>
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
    state: PropTypes.string,
  }).isRequired,
  handlePress: PropTypes.func.isRequired,
};

export default HistoryEntry;
