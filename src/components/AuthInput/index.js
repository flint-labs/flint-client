import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const AuthInput = ({ state, setState, renderIcon, customProps }) => (
  <View style={styles.input}>
    {renderIcon()}
    <TextInput
      style={styles.inputElement}
      onChangeText={text => setState(text)}
      blurOnSubmit={false}
      value={state.toString()}
      autoCorrect={false}
      autoCapitalize={false}
      {...customProps}
    />
  </View>
);

AuthInput.propTypes = {
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setState: PropTypes.func.isRequired,
  renderIcon: PropTypes.func,
  customProps: PropTypes.shape({
    placeholder: PropTypes.string,
    returnKeyType: PropTypes.string,
    onSubmitEditing: PropTypes.func,
    onFocus: PropTypes.func,
    ref: PropTypes.func,
    secureTextEntry: PropTypes.bool,
  }),
};

AuthInput.defaultProps = {
  customProps: {},
  renderIcon: () => {},
};

export default AuthInput;
