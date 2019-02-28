import React from 'react';
import { View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from './Styles';

const category1 = require('../../../assets/images/Home/cate1.jpg');
const category2 = require('../../../assets/images/Home/cate2.jpg');
const category3 = require('../../../assets/images/Home/cate3.jpg');
const category4 = require('../../../assets/images/Home/cate4.jpg');

const imageArray = [category1, category2, category3, category4];

const FeedbackEntry = ({ index }) => (
  <View style={styles.feedbackEntryImgContainer}>
    <ImageBackground
      source={imageArray[index]}
      style={styles.feedbackEntryImage}
      imageStyle={{ borderRadius: 5 }}
    />
  </View>
);

FeedbackEntry.propTypes = {
  index: PropTypes.number.isRequired,
};

export default FeedbackEntry;
