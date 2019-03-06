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
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        borderRadius: 5,
        padding: 15,
        justifyContent: 'center',
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', fontStyle: 'italic' }}>
        <Text style={styles.reportEntryTitle}>{`${data.index}th Record`}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}
        >
          {data.description}
        </Text>
      </View>

      <View
        style={{
          alignItems: 'flex-end',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Icon name="ios-checkmark-circle" size={30} style={{ color: 'white' }} />
      </View>
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
