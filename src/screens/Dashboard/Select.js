import React from 'react';
import {
  TouchableOpacity, Text, Modal, FlatList, SafeAreaView, View,
} from 'react-native';
import PropTypes from 'prop-types';

const fakeData = [
  { title: '감자깎이' },
  { title: '아침 6시 일어나기' },
  { title: '태권도 꼭 가기' },
  { title: '헬스하기' },
];

const Select = ({ hideModal }) => (
  <Modal transparent style={{ flex: 1 }} animationType="slide">
    <View style={{ flex: 1, backgroundColor: 'rgb(100,0,0, 0.1)' }} />
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={fakeData}
        renderItem={itemData => (
          <TouchableOpacity onPress={hideModal}>
            <Text style={{ fontSize: 30 }}>{itemData.item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  </Modal>
);

Select.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default Select;
