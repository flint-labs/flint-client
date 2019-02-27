import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

const img = require('../../../assets/images/Home/cate2.jpg');

const ReportEntry = ({ data }) => (
  <View style={styles.reportEntryContainer}>
    <View style={{ flex: 0.3 }}>
      <Image source={img} style={{ width: 100, height: 70 }} />
    </View>
    <View style={{ flex: 0.7 }}>
      <Text style={{ fontWeight: 'bold' }}>{data.title}</Text>
      <Text>{data.description}</Text>
      <Text>{data.state}</Text>
    </View>
  </View>
);

ReportEntry.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReportEntry;
