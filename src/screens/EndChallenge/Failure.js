import React from 'react';
import {
  View, Text, TextInput, AsyncStorage, Alert, Image,
} from 'react-native';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import styles from './styles';
import OrangeButton from '../../components/OrangeButton';

const failureImage = require('../../../assets/images/Dashboard/failure.png');

const Failure = ({ recentChallenge, updateChallengeStateRequest, refreshDashboard }) => (
  <Modal style={styles.container} isVisible>
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1, alignItems: 'center' }}
      extraHeight={100}
    >
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 18 }}>{recentChallenge.title}</Text>
      </View>
      <View style={{ flex: 0.8 }} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Failure</Text>
      </View>
      <View style={styles.failureImageContainer}>
        <Image source={failureImage} style={{ resizeMode: 'contain', width: 110, height: 110 }} />
      </View>
      <TextInput
        placeholder={'기부자명을 입력해주세요.\n (미입력시 닉네임)'}
        multiline
        style={styles.donationInput}
      />
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
      <View style={{ flex: 1.2 }} />
    </KeyboardAwareScrollView>
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
