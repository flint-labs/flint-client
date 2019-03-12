import React from 'react';
import {
  View, Text, AsyncStorage, Alert, Image,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import styles from './styles';
import OrangeButton from '../../components/OrangeButton';

const failureImage = require('../../../assets/images/Dashboard/failure.png');

const Failure = ({ recentChallenge, updateChallengeStateRequest, refreshDashboard }) => (
  <Modal style={styles.container} isVisible>
    <View style={styles.headerContainer}>
      <Text style={{ fontSize: 18 }}>{recentChallenge.title}</Text>
    </View>
    <View style={{ flex: 1 }} />
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Failure</Text>
    </View>
    <View style={{ flex: 1, marginRight: '5%' }}>
      <Image source={failureImage} style={{ resizeMode: 'contain', width: 100, height: 100 }} />
    </View>
    <View style={styles.buttonContainer}>
      <OrangeButton
        text="확인"
        onPress={async () => {
          await updateChallengeStateRequest('failure');
          await AsyncStorage.removeItem('recentChallenge');
          await refreshDashboard();
          Alert.alert('완료되었습니다');
        }}
      />
    </View>
    <View style={{ flex: 1.5 }} />
  </Modal>
);

Failure.propTypes = {
  recentChallenge: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  updateChallengeStateRequest: PropTypes.func.isRequired,
  refreshDashboard: PropTypes.func.isRequired,
};

export default Failure;
