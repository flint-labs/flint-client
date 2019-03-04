import React from 'react';
import {
  TouchableOpacity, View, TextInput, Alert, Image, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
// import { createStackNavigator } from 'react-navigation';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import styles from './style';
import { OrangeButton } from '../../components';

const baseUrl = 'http://13.209.19.196:3000';
const cameraImage = require('../../../assets/images/Dashboard/camera.png');

class DoIt extends React.Component {
  static navigationOptions = () => ({
    headerTitle: <Image source={cameraImage} style={{ width: 30, height: 30 }} />,
  });

  state = { text: null };

  submitBtnHandler = () => {
    // console.log(modalVisible, hideModal);
    const { toggleModal, recentChallenge } = this.props;
    const { text } = this.state;
    axios.post(`${baseUrl}/api/reports/postReport`, {
      image: '',
      isConfirmed: 'pending',
      description: text,
      challengeId: recentChallenge.id,
    });
    Alert.alert('제출되었습니다.', null, [
      {
        text: 'OK',
        onPress: () => {
          toggleModal();
        },
      },
    ]);
  };

  render() {
    const { modalVisible, toggleModal } = this.props;
    return (
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <TouchableOpacity onPress={toggleModal} style={{ flex: 0.5 }}>
            <Icon size={35} name="ios-arrow-round-back" />
          </TouchableOpacity>
          <View style={{ flex: 10 }}>
            <View style={styles.modalTextInputContainer}>
              <TextInput
                style={styles.modalTextInput}
                placeholder="챌린지에 대한 일지를 남겨주세요"
                multiline
                autoFocus
                blurOnSubmit
                onChangeText={text => this.setState({ text })}
              />
            </View>
            <View style={{ flex: 1, marginLeft: '5%' }}>
              <TouchableOpacity style={styles.imageRefBtn}>
                <Image source={cameraImage} style={{ width: 80, height: 80 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.submitBtnContainer}>
              <OrangeButton text="제출" onPress={this.submitBtnHandler} />
            </View>
            <View style={{ flex: 1 }} />
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

DoIt.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  recentChallenge: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
}; // 꼭 필요하면 isRequired 써주기

export default DoIt;
