import React from 'react';
import {
  View, Text, AsyncStorage, Alert, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import styles from './styles';
import OrangeButton from '../../components/OrangeButton';

const successImage = require('../../../assets/images/Dashboard/success.png');

const Success = ({
  recentChallenge,
  updateChallengeStateRequest,
  refreshDashboard,
  handleIsFailure,
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
      <Image source={successImage} style={{ resizeMode: 'contain', width: 100, height: 100 }} />
    </View>
    <View style={styles.buttonContainer}>
      <OrangeButton
        text="확인"
        onPress={async () => {
          await updateChallengeStateRequest('success');
          await AsyncStorage.removeItem('recentChallenge');
          handleIsFailure();
          await refreshDashboard();
          Alert.alert('완료되었습니다');
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
  refreshDashboard: PropTypes.func.isRequired,
  handleIsFailure: PropTypes.func.isRequired,
};

export default Success;
