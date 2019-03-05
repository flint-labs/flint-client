import React from 'react';
import {
  TouchableOpacity, Text, FlatList, View, Dimensions, AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import styles from './style';

const baseUrl = 'http://13.209.19.196:3000';
// import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

const Select = ({
  toggleSubView,
  handleChallenges,
  challenges,
  handleRecentChallenge,
  recentChallenge,
  handleDashboardTitle,
}) => {
  const handleChallengeListButton = async item => {
    // item은 최근 challenge
    const { id } = await AsyncStorage.getItem('userInfo');
    axios
      .get(`${baseUrl}/api/challenges/getInProgressChallenges/${id}`)
      .then(res => {
        handleChallenges(res.data.challenges);
      })
      .catch(err => console.log(err));
    await AsyncStorage.setItem('recentChallenge', JSON.stringify(item));
    // console.log(JSON.stringify(item));
    handleRecentChallenge(item);
    toggleSubView();
    handleDashboardTitle(item.title);
  };

  return (
    <View style={{ flex: 1 }}>
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
      <View style={{ alignItems: 'center', height: 25 }}>
        <Icon size={40} color="#dcdcdc" name="ios-remove" />
      </View>
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
  handleDashboardTitle: PropTypes.func.isRequired,
};

export default Select;
