import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

const Dashboard = () => (
  <View style={styles.container}>
    <View style={styles.sloganContainer}>
      <Text>대쉬보드</Text>
    </View>
    <View style={styles.progressContainer}>
      <Text>허들뛰기</Text>
    </View>
    <View style={styles.doItContainer}>
      <TouchableOpacity>
        <Text>했다!</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Dashboard;
