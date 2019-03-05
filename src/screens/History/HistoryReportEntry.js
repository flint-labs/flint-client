import React from 'react';
import { Text, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

const img = require('../../../assets/images/Home/cate1.jpg');

const HistoryReportEntry = ({ data }) => (
  <ImageBackground
    source={img}
    style={styles.historyReportEntryBackgroundImg}
    imageStyle={{ borderRadius: 5 }}
    blurRadius={4}
  >
    <Text style={{ color: 'white', fontSize: 20 }}>{data.description}</Text>
  </ImageBackground>
);

HistoryReportEntry.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default HistoryReportEntry;
