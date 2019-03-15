import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';

const ReportEntry = ({ data }) => {
  const time = data.updatedAt.split('').slice(0, 19);
  time[10] = '  ';

  return (
    <ImageBackground
      source={{
        uri: `https://s3.ap-northeast-2.amazonaws.com/flint-s3/s3/${
          data.challengeId
        }-${data.id}`,
      }}
      style={styles.reportEntryBackgroundImg}
      imageStyle={{ borderRadius: 5 }}
      blurRadius={4}
    >
      <View style={styles.reportImgBlur}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}
        >
          <Text style={styles.reportEntryTitle}>{`${
            data.index
          }th Record`}</Text>
          <Text style={{ color: 'white' }}>{`| ${time.join('')}`}</Text>
        </View>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              fontWeight: '500',
            }}
          >
            {data.description}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-end',
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Icon
            name="ios-checkmark-circle"
            size={30}
            style={{ color: 'white' }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

ReportEntry.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
    isConfirmed: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReportEntry;
