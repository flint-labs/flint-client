import React from 'react';
import {
  TouchableOpacity, Text, FlatList, View, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
// import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');
const fakeData = [
  { title: '감자깎기' },
  { title: '아침 6시 일어나기' },
  { title: '태권도 꼭 가기' },
  { title: '헬스하기' },
];

const Select = ({ toggleSubView }) => (
  <View style={{ flex: 1, paddingHorizontal: '5%' }}>
    <FlatList
      data={fakeData}
      renderItem={itemData => (
        <TouchableOpacity
          onPress={toggleSubView}
          style={{
            height: 30,
            // alignItems: 'center',
            margin: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>{itemData.item.title}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      style={{ width }}
    />
    <View style={{ alignItems: 'center', height: 25 }}>
      <Icon size={40} color="#dcdcdc" name="ios-remove" />
    </View>
  </View>
);

Select.propTypes = {
  toggleSubView: PropTypes.func.isRequired,
};

export default Select;
