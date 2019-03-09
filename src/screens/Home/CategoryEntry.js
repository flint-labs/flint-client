import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';

import styles from './Styles';

const CategoryEntry = ({ img, title, goToScreen }) => (
  <TouchableOpacity onPress={() => goToScreen('ChallengeSetting', title)}>
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

export default CategoryEntry;
