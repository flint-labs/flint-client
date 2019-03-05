import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';

const img = require('../../../assets/images/Home/cate1.jpg');

const ReportEntry = ({ data }) => (
  <ImageBackground
    source={img}
    style={styles.historyReportEntryBackgroundImg}
    imageStyle={{ borderRadius: 5 }}
    blurRadius={4}
  >
    <Text style={styles.historyReportEntryTitle}>{data.title}</Text>
    <Text style={{ color: 'white', fontSize: 20 }}>{data.description}</Text>
  </ImageBackground>
);

ReportEntry.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReportEntry;
