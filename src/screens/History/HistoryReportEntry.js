import React from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

const img = require('../../../assets/images/Home/cate1.jpg');

const HistoryReportEntry = ({ data }) => (
  <View style={styles.refereeEntry}>
    <View style={styles.imageContainer}>
      <Image
        source={img}
        style={{
          width: 120,
          resizeMode: 'cover',
          flex: 1,
          borderRadius: 5,
        }}
      />
    </View>
    <View style={{ flex: 3 }}>
      <Text style={styles.descriptionText}>{data.description}</Text>
      <Text style={styles.stateText}>
        {data.isConfirmed ? 'PASS' : 'FALURE'}
      </Text>
    </View>
  </View>
);

HistoryReportEntry.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default HistoryReportEntry;
