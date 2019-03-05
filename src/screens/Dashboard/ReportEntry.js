import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';

const ReportEntry = ({ data }) => (
  <ImageBackground
    source={{ uri: data.image }}
    style={styles.reportEntryBackgroundImg}
    imageStyle={{ borderRadius: 5 }}
    blurRadius={4}
  >
    <Text style={styles.reportEntryTitle}>번째 기록</Text>
    <Text style={{ color: 'black', fontSize: 20 }}>{data.description}</Text>
    <View style={{ alignItems: 'flex-end' }}>
      <Icon
        name={data.isConfirmed === '1' ? 'ios-checkmark-circle' : 'ios-close-circle'}
        size={20}
        style={{ color: 'black' }}
      />
    </View>
  </ImageBackground>
);

ReportEntry.propTypes = {
  data: PropTypes.shape({
    // title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isConfirmed: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReportEntry;
