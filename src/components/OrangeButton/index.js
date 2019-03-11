import React from 'react';
import {
  TouchableOpacity, Text, Dimensions, Alert,
} from 'react-native';
import PropTypes from 'prop-types';

const style = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 10,
  paddingTop: 10,
  paddingBottom: 10,
  backgroundColor: '#FF6600',
  borderRadius: 5,
  shadowOffset: { width: 5, height: 5 },
  shadowColor: '#dcdcdc',
  shadowOpacity: 1.0,
};

const OrangeButton = ({
  text, width, onPress, marginTop,
}) => (
  <TouchableOpacity style={{ ...style, width, marginTop }} onPress={onPress}>
    <Text style={{ color: 'white', fontSize: 17, fontWeight: '600' }}>{text}</Text>
  </TouchableOpacity>
);

OrangeButton.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.number,
  onPress: PropTypes.func,
  marginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const { width } = Dimensions.get('window');
OrangeButton.defaultProps = {
  width: width * 0.7,
  onPress: () => Alert.alert('Button Clicked'),
  marginTop: 30,
};

export default OrangeButton;
