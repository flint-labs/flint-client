import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './Styles';

const fakeImage = require('../../../assets/images/Home/cate1.jpg');

const RefereeEntry = ({ data, modal }) => (
  <TouchableOpacity
    onPress={() => {
      modal(data.image, data.description, data.id);
    }}
  >
    <View style={styles.refereeEntry}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: data.image }}
          style={{
            width: 120,
            resizeMode: 'cover',
            flex: 1,
            borderRadius: 5,
          }}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.titleText}>{data.nickname}</Text>
        <Text style={styles.descriptionText}>{data.description}</Text>
        <Text style={styles.stateText}>{data.isConfirmed}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

RefereeEntry.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
  modal: PropTypes.func.isRequired,
};

export default RefereeEntry;
