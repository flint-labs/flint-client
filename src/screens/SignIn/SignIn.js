import React from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './styles';

const { registerButtonBox } = styles;

export const renderRegisterButton = () => (
  <View style={registerButtonBox}>
    <Text>
  Flint 회원이 아니신가요?
    </Text>
    <TouchableOpacity>
      <Text style={{ fontWeight: 'bold' }}> 지금 가입하세요 🎉</Text>
    </TouchableOpacity>
  </View>
);

export const renderIcon = ({ name, style }) => (
  <Icon name={name} size={20} color="#333" style={style} />
);

renderIcon.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.shape({
    paddingRight: PropTypes.number,
    paddingLeft: PropTypes.number,
  }),
};

renderIcon.defaultProps = {
  style: {},
};
