import React from 'react';
import {
  View, Text, Image, ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';

const img = require('../../../assets/images/Home/cate2.jpg');

const ReportEntry = ({ data }) => (
  <ImageBackground
    source={img}
    style={{
      flex: 1,
      resizeMode: 'contain',
      // margin: 5,
      justifyContent: 'center',
      padding: 20,
    }}
    imageStyle={{ borderRadius: 5 }}
    blurRadius={4}
  >
    <Text
      style={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
      }}
    >
      {data.title}
    </Text>
    <Text style={{ color: 'white', fontSize: 20 }}>{data.description}</Text>
    <View style={{ alignItems: 'flex-end' }}>
      <Icon name="ios-checkmark-circle" size={20} style={{ color: 'white' }} />
    </View>
  </ImageBackground>
);

ReportEntry.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReportEntry;
