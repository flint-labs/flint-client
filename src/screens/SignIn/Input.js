import React from 'react';
import {
  View, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const renderInput = ({
  state, setState, renderIcon, customProps,
}) => (
  <View style={styles.input}>
    {renderIcon()}
    <TextInput
      style={styles.inputElement}
      onChangeText={text => setState(text)}
      blurOnSubmit={false}
      value={state}
      {...customProps}
    />
  </View>
);

renderInput.propTypes = {
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  renderIcon: PropTypes.func.isRequired,
  customProps: PropTypes.shape({
    placeholder: PropTypes.string,
    returnKeyType: PropTypes.string,
    onSubmitEditing: PropTypes.func,
    onFocus: PropTypes.func,
    ref: PropTypes.func,
    secureTextEntry: PropTypes.bool,
  }),
};

renderInput.defaultProps = {
  customProps: {},
};

export default renderInput;
