import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './Styles';

const fakeImage = require('../../../assets/images/Home/cate1.jpg');

const RefereeEntry = ({ data, modal }) => (
  <TouchableOpacity
    onPress={() => {
      console.log('click');
      modal();
    }}
  >
    <View style={styles.refereeEntry}>
      <View style={styles.imageContainer}>
        <Image
          source={fakeImage}
          style={{
            width: 120,
            resizeMode: 'cover',
            flex: 1,
            borderRadius: 5,
          }}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.titleText}>{data.title}</Text>
        <Text style={styles.descriptionText}>{data.description}</Text>
        <Text style={styles.stateText}>{data.state}</Text>
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
};

export default RefereeEntry;
