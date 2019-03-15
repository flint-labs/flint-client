import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';

const ReportEntry = ({ data }) => (
  <ImageBackground
    source={{
      uri: `https://s3.ap-northeast-2.amazonaws.com/flint-s3/s3/${data.challengeId}-${data.id}`,
    }}
    style={styles.reportEntryBackgroundImg}
    imageStyle={{ borderRadius: 5 }}
    blurRadius={4}
  >
    <View
      style={[
        styles.blurView,
        { backgroundColor: data.isConfirmed === 'true' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.8)' },
      ]}
    >
      {data.isConfirmed === 'true' ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', fontStyle: 'italic' }}>
            <Text style={styles.reportEntryTitle}>{`${data.index}th Record`}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
              }}
            >
              {data.description}
            </Text>
          </View>

          <View style={styles.checkIconContainer}>
            <Icon name="ios-checkmark-circle" size={30} style={{ color: 'white' }} />
          </View>
        </View>
      ) : (
        <View style={styles.pendingMessageContainer}>
          <Text style={styles.pendingMessage}>심판의 응답을 기다리는 중...</Text>
        </View>
      )}
    </View>
  </ImageBackground>
);

ReportEntry.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
    isConfirmed: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReportEntry;
