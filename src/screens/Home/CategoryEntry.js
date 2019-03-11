import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';

import styles from './Styles';

const CategoryEntry = ({ img, title, goToScreen, description }) => (
  <TouchableOpacity onPress={() => goToScreen('ChallengeSetting', title)}>
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

export default CategoryEntry;
