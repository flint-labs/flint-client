import React from 'react';
import {
  TouchableOpacity, Text, FlatList, View, Dimensions, AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
import sendRequest from '../../modules/sendRequest';
import styles from './style';

const { width } = Dimensions.get('window');

const Select = ({
  toggleSubView,
  handleChallenges,
  challenges,
  handleRecentChallenge,
  recentChallenge,
}) => {
  const handleChallengeListButton = async item => {
    // item은 최근 challenge
    const { id } = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const { data } = await sendRequest('get', `/api/challenges/getInProgressChallenges/${id}`);
    await handleChallenges(data.challenges);
    await AsyncStorage.setItem('recentChallenge', JSON.stringify(item));
    await handleRecentChallenge(item);
    toggleSubView();
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={challenges}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleChallengeListButton(item)}
            style={styles.ChallengeListButton}
          >
            <Text style={{ fontSize: 20 }}>{item.title}</Text>
            {recentChallenge.id === item.id && (
              <Icon size={30} color="limegreen" name="ios-checkmark" />
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        style={{ width }}
      />
      
    </View>
  );
};

Select.propTypes = {
  toggleSubView: PropTypes.func.isRequired,
  handleChallenges: PropTypes.func.isRequired,
  handleRecentChallenge: PropTypes.func.isRequired,
  challenges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slogan: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  recentChallenge: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
};

export default Select;
