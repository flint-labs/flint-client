import React from 'react';
import { View, Text, Dimensions, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from './Styles';
import FeedbackEntry from './FeedbackEntry';

const { width } = Dimensions.get('window');

const targetArray = [1, 2, 3, 4];

const renderItem = item => {
  console.log(item);
  return (
    <View style={styles.feedbackEntry}>
      <FeedbackEntry index={item.index} />
    </View>
  );
};
const Feedback = () => (
  <View style={{ marginTop: 20, marginBottom: 30 }}>
    <ImageBackground
      source={require('../../../assets/images/Home/background.png')}
      style={{ width, height: 300 }}
    >
      <View style={styles.userFeedback}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '500',
            color: 'white',
            marginLeft: 20,
            marginBottom: 15,
            alignSelf: 'center',
            fontFamily: 'Fontrust',
          }}
        >
          Our Story
        </Text>
        <View style={styles.feedbackContainer}>
          <Carousel
            swipeThreshold={5}
            data={targetArray}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width * 0.8}
            // layoutCardOffset={20}
            sliderHeight={270}
          />
        </View>
      </View>
    </ImageBackground>
  </View>
);

export default Feedback;
