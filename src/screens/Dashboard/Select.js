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
// const fakeData = [
//   { title: '감자깎기' },
//   { title: '아침 6시 일어나기' },
//   { title: '태권도 꼭 가기' },
//   { title: '헬스하기' },
// ];

const Select = ({
  toggleSubView,
  handleChallenges,
  challenges,
  handleRecentChallenge,
  recentChallenge,
}) => {
  const handleChallengeListButton = async (item) => {
    axios
      .get(`${baseUrl}/api/challenges/getInProgressChallenges/1`)
      .then((res) => {
        handleChallenges(res.data.challenges);
      })
      .catch(err => console.log(err));
    await AsyncStorage.setItem('recentChallengeId', item.id.toString());
    handleRecentChallenge(challenges.filter(el => el.id === item.id)[0]);
    toggleSubView();
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
};

export default Select;
