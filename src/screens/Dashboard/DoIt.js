import React from 'react';
import {
  Text, Modal, TouchableOpacity, View, TextInput, Alert, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

const cameraImage = require('../../../assets/images/Dashboard/camera.png');

class DoIt extends React.Component {
  static navigationOptions = () => ({
    headerTitle: <Image source={cameraImage} style={{ width: 30, height: 30 }} />,
  });

  submitBtnHandler = () => {
    // console.log(modalVisible, hideModal);
    const { hideModal } = this.props;
    Alert.alert('제출되었습니다.', null, [
      {
        text: 'OK',
        onPress: () => {
          hideModal();
        },
      },
    ]);
  };

  render() {
    const { modalVisible } = this.props;
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={{ flex: 1 }}>
          <View style={styles.modalTextInputContainer}>
            <TextInput
              style={styles.modalTextInput}
              placeholder="챌린지에 대한 일지를 남겨주세요"
            />
            <TouchableOpacity style={styles.imageRefBtn}>
              <Image source={cameraImage} style={{ width: 80, height: 80 }} />
            </TouchableOpacity>
          </View>
          <View style={styles.submitBtnContainer}>
            <TouchableOpacity onPress={this.submitBtnHandler} style={styles.submitBtn}>
              <Text style={styles.submitText}>제출</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

DoIt.propTypes = {
  modalVisible: PropTypes.boolean,
  hideModal: PropTypes.function,
};

export default DoIt;
