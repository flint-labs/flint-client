import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

import styles from './Styles';

const CategoryEntry = ({ img, title }) => (
  <View style={styles.categoryEntryImgContainer}>
    <ImageBackground
      source={img}
      style={styles.categoryEntryImage}
      imageStyle={{ borderRadius: 15 }}
    >
      <View style={styles.categoryEntryImageBlur}>
        <Text style={{ color: 'white', fontSize: 20 }}>{title}</Text>
      </View>
    </ImageBackground>
  </View>
);

export default CategoryEntry;
