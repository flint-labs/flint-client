import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

const HistoryEntry = ({ data }) => (
  <View style={styles.historyEntryContainer}>
    <Text style={styles.titleText}>{data.title}</Text>
    <Text style={styles.descriptionText}>{data.description}</Text>
    <Text style={styles.stateText}>{data.state}</Text>
  </View>
);

HistoryEntry.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

export default HistoryEntry;
