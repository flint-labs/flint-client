import React from 'react';
import {
  View, Text, TextInput, AsyncStorage,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import styles from './styles';
import OrangeButton from '../../components/OrangeButton';

const Failure = ({
  recentChallenge, updateChallengeStateRequest, handleExistEnd, navigation,
}) => (
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
      <View style={{ flex: 1 }}>
        <Icon name="ios-sad" size={80} />
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
            navigation.navigate('component');
          }}
        />
      </View>
      <View style={{ flex: 1.5 }} />
    </KeyboardAwareScrollView>
  </Modal>
);

Failure.propTypes = {
  recentChallenge: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  updateChallengeStateRequest: PropTypes.func.isRequired,
};

export default Failure;
