import React from 'react';
import {
  TouchableOpacity, View, TextInput, Alert, Image, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
// import { createStackNavigator } from 'react-navigation';
import { ImagePicker, Permissions } from 'expo';
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

  state = { text: null, photo: null };

  submitBtnHandler = () => {
    // console.log(modalVisible, hideModal);
    const { toggleModal, recentChallenge } = this.props;
    const { text, photo } = this.state;
    if (text.length <= 50 && photo) {
      axios.post(`${baseUrl}/api/reports/postReport`, {
        image: photo,
        isConfirmed: 'pending',
        description: text,
        challengeId: recentChallenge.id,
      });
      Alert.alert('제출되었습니다.', null, [
        {
          text: 'OK',
          onPress: () => {
            toggleModal();
            this.setState({ photo: null });
          },
        },
      ]);
    } else if (text.length > 50) {
      Alert.alert('50자 이내로 작성해주세요');
    } else {
      Alert.alert('내용과 사진을 채워주세요');
    }
  };

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
      allowsEditing: true,
    });
    if (!cancelled) this.setState({ photo: uri });
  };

  render() {
    const { modalVisible, toggleModal } = this.props;
    const { photo } = this.state;
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
                placeholder={'도전에 대한 일지를 남겨주세요\n( 50자 이내 )'}
                multiline
                autoFocus
                blurOnSubmit
                onChangeText={text => this.setState({ text })}
              />
            </View>
            <View style={{ flex: 1, marginLeft: '5%' }}>
              <TouchableOpacity style={styles.imageRefBtn} onPress={this.selectPicture}>
                <Image
                  source={photo ? { uri: photo } : cameraImage}
                  style={{ width: 80, height: 80 }}
                />
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
