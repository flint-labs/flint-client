import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import { challengeAction } from '../../actions';
import styles from './Styles';

const { SET_CATEGORY } = challengeAction;

const CategoryEntry = ({
  img,
  title,
  goToScreen,
  description,
  setCategory,
}) => {
  const handleOnPress = async () => {
    try {
      const { id } = JSON.parse(await AsyncStorage.getItem('userInfo'));
      setCategory(title);
      goToScreen('ChallengeSetting');
    } catch (error) {
      goToScreen('SignIn');
    }
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.categoryEntryImgContainer}>
        <ImageBackground
          source={img}
          style={styles.categoryEntryImage}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.categoryEntryImageBlur}>
            <Text
              style={{
                color: 'white',
                fontSize: 25,
                fontWeight: '600',
                marginLeft: 20,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              {description}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default connect(
  null,
  dispatch => ({
    setCategory: category =>
      dispatch({ type: SET_CATEGORY, payload: { category } }),
  }),
)(CategoryEntry);
