import React from 'react';
import {
  TouchableOpacity, Text, SafeAreaView, Image, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { View } from 'react-native-animatable';

const { width } = Dimensions.get('window');
const CHECK_URL = 'https://www.kasa-solutions.com/wp-content/uploads/sites/2/2016/01/icon-check.png';

const Success = ({ navigation }) => {
  const handleOnPress = () => {
    alert('Some logic here...');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View animation="zoomInDown" delay={1000} style={{ flex: 5, justifyContent: 'flex-end', alignItems: 'center' }}>
        <Image style={{ width: width * 0.4, height: width * 0.4 }} source={{ uri: CHECK_URL }} />
      </View>

      <View style={{ flex: 4, alignItems: 'center', marginTop: 30 }}>
        <TouchableOpacity onPress={handleOnPress}>
          <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>
            Challenge 확인하러 가기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

Success.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Success;
