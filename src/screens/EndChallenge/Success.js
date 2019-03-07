import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const Success = () => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Success</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Icon name="ios-rocket" size={200} />
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{'새로운 도전을\n 시작하세요'}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Success;
