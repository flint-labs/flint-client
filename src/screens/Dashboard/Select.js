import React from 'react';
import {
  TouchableOpacity, Text, FlatList, View,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

const fakeData = [
  { title: '감자깎기' },
  { title: '아침 6시 일어나기' },
  { title: '태권도 꼭 가기' },
  { title: '헬스하기' },
];

const Select = ({ hideModal }) => (
  <Modal isVisible animationIn="slideInDown" transparent backdropOpacity={0.3} scrollOffset={45}>
    <View style={{ flex: 1 }}>
      {/* <SafeAreaView style={{ flex: 1, alignItems: 'center' }}> */}
      <View
        style={{
          flex: 0.3,
          backgroundColor: 'white',
          // alignItems: 'center',
          // justifyContent: 'center',
          width: '100%',
        }}
      >
        <FlatList
          data={fakeData}
          renderItem={itemData => (
            <TouchableOpacity
              onPress={hideModal}
              style={{
                height: 30,
                alignItems: 'center',
                margin: 10,
                // borderBottomWidth: 0.5,
              }}
            >
              <Text style={{ fontSize: 23 }}>{itemData.item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {/* </SafeAreaView> */}
      {/* <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>나는 유건입니다</Text> */}
    </View>
  </Modal>
);

Select.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default Select;
