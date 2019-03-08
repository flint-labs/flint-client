import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import styles from './styles';
import OrangeButton from '../../components/OrangeButton';

const Success = ({
  recentChallenge, updateChallengeStateRequest, handleExistEnd, navigation,
}) => (
  <Modal style={styles.container} isVisible>
    <View style={styles.headerContainer}>
      <Text style={{ fontSize: 18 }}>{recentChallenge.title}</Text>
    </View>
    <View style={{ flex: 1 }} />
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Success</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Icon name="ios-rocket" size={80} />
    </View>
    <View style={styles.buttonContainer}>
      <OrangeButton
        text="확인"
        onPress={async () => {
          await updateChallengeStateRequest('success');
          navigation.navigate('component');
        }}
      />
    </View>
    <View style={{ flex: 1.5 }} />
  </Modal>
);

Success.propTypes = {
  recentChallenge: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  updateChallengeStateRequest: PropTypes.func.isRequired,
};

export default Success;
