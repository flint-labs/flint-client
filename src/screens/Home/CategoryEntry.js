import React from 'react';
import { connect } from 'react-redux';
import {
  View, Text, ImageBackground, TouchableOpacity,
} from 'react-native';

import { challengeAction } from '../../actions';
import styles from './Styles';

const { SET_CATEGORY } = challengeAction;
const CategoryEntry = ({
  img, title, goToScreen, setCategory,
}) => {
  const handleOnPress = () => {
    setCategory(title);
    goToScreen('ChallengeSetting');
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.categoryEntryImgContainer}>
        <ImageBackground
          source={img}
          style={styles.categoryEntryImage}
          imageStyle={{
            borderRadius: 10,
          }}
        >
          <View style={styles.categoryEntryImageBlur}>
            <Text style={{ color: 'white', fontSize: 20 }}>{title}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default connect(
  null,
  dispatch => ({
    setCategory: category => dispatch({ type: SET_CATEGORY, payload: { category } }),
  }),
)(CategoryEntry);
