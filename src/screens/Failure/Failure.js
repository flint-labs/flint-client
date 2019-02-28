import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../Success/styles';

const Failure = () => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Failure</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Icon name="ios-sad" size={200} />
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>아쉽네요 새로운</Text>
        <Text style={styles.buttonText}>도전을 시작하실래요?</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Failure;
