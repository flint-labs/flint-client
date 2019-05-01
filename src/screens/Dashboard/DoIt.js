import React from 'react';
import {
  TouchableOpacity, View, TextInput, Alert, Image, SafeAreaView, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { ImagePicker, Permissions } from 'expo';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import { OrangeButton } from '../../components';
import sendRequest from '../../modules/sendRequest';

const cameraImage = require('../../../assets/images/Dashboard/camera.png');

class DoIt extends React.Component {
  static navigationOptions = () => ({
    headerTitle: <Image source={cameraImage} style={{ width: 30, height: 30 }} />,
  });

  state = { text: null, photo: null };

  submitBtnHandler = async () => {
    const { recentChallenge, refreshDashboard } = this.props;
    const { text, photo } = this.state;
    if (text !== null && text.length <= 50 && text.length > 0 && photo) {
      const res = await sendRequest('post', '/api/reports/postReport', null, {
        isConfirmed: 'pending',
        description: text,
        challengeId: recentChallenge.id,
        image: `${recentChallenge.id}${new Date()}`,
      });

      const data = new FormData();
      data.append('name', 'avatar');
      data.append('fileData', {
        uri: photo.uri,
        type: photo.type,
        name: `${recentChallenge.id}-${res.data.reported.id}`,
      });
      const config = {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      };
      fetch('http://13.209.19.196:3000/api/reports/imageUpload', config);

      Alert.alert('제출되었습니다.', null, [
        {
          text: 'OK',
          onPress: () => {
            this.closeModal();
            refreshDashboard();
          },
        },
      ]);
    } else {
      Alert.alert('내용과 사진을 채워주세요');
    }
  };

  closeModal = () => {
    const { toggleModal } = this.props;
    toggleModal();
    this.setState({ photo: null, text: null });
  };

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const photo = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
      allowsEditing: true,
    });
    if (!photo.cancelled) this.setState({ photo });
  };

  render() {
    const { modalVisible, recentChallenge } = this.props;
    const { photo, text } = this.state;
    return (
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={this.closeModal}
        >
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ flex: 1 }}
            enableAutomaticScroll
            extraHeight={180}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.doItHeaderContainer}>
                <TouchableOpacity onPress={this.closeModal} style={{ flex: 0.5, height: '100%' }}>
                  <Icon size={35} name="ios-arrow-round-back" />
                </TouchableOpacity>
                <View style={styles.doItHeaderTitleContainer}>
                  <Text style={{ fontSize: 20 }}>{recentChallenge.title}</Text>
                </View>
                <View style={{ flex: 0.5, height: '100%' }}>
                  <Text />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.modalTextInputContainer}>
                  <TextInput
                    style={styles.modalTextInput}
                    placeholder={'도전에 대한 일지를 남겨주세요\n( 50자 이내 )'}
                    multiline
                    autoFocus
                    blurOnSubmit
                    onChangeText={inputText => this.setState({ text: inputText })}
                    maxLength={50}
                    value={text}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: '5%' }}>
                  <TouchableOpacity style={styles.imageRefBtn} onPress={this.selectPicture}>
                    <Image
                      source={photo ? { uri: photo.uri } : cameraImage}
                      style={{ width: 80, height: 80 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.submitBtnContainer}>
                  <OrangeButton text="제출" onPress={this.submitBtnHandler} />
                </View>
                <View style={{ flex: 2 }} />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </Modal>
      </SafeAreaView>
    );
  }
}

DoIt.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  recentChallenge: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  refreshDashboard: PropTypes.func.isRequired,
}; // 꼭 필요하면 isRequired 써주기

export default DoIt;
