import React from 'react';
import {
  Text, Modal, TouchableOpacity, View, TextInput, Alert,
} from 'react-native';
import styles from './style';
// import PropTypes from 'prop-types';

const DoIt = ({ modalVisible, hideModal }) => {
  const submitBtnHandler = () => {
    Alert.alert('제출되었습니다.', null, [
      {
        text: 'OK',
        onPress: () => {
          hideModal();
        },
      },
    ]);
  };

  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <View style={{ flex: 1 }}>
        <View style={styles.modalTextInputContainer}>
          <TextInput style={styles.modalTextInput} placeholder="내용을 입력하세요." />
          <TouchableOpacity style={styles.imageRefBtn}>
            <Text style={{ fontSize: 20 }}>사진첨부</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitBtnContainer}>
          <TouchableOpacity onPress={submitBtnHandler} style={styles.submitBtn}>
            <Text style={{ fontSize: 18, color: 'white' }}>제출</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// DoIt.propTypes = {
//   modalVisible: PropTypes.boolean,
//   hideModal: PropTypes.function,
// };

export default DoIt;
