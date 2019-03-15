import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './Styles';

const RefereeEntry = ({ data, modal }) => {
  const img = {
    uri: `https://s3.ap-northeast-2.amazonaws.com/flint-s3/s3/${
      data.challengeId
    }-${data.id}`,
  };

  return (
    <TouchableOpacity
      onPress={() => {
        modal(img, data.description, data.id, data.nickname);
      }}
    >
      <View style={styles.refereeEntry}>
        <View style={styles.imageContainer}>
          <Image
            source={img}
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
};

RefereeEntry.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
  modal: PropTypes.func.isRequired,
};

export default RefereeEntry;
