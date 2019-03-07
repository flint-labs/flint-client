import { Dimensions, StyleSheet } from 'react-native';

// const 살구색 = '#F8B195';
// const 핑크색 = '#F67280';
// const 남색 = '#355C7D';
// const 주황색 = '#FF6600';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  redButton: {
    color: 'red',
  },

  adBoxOuter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  adBoxInner: {
    flex: 1,
    margin: 10,
    minWidth: width - 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  img: {
    width: width - 50,
    height: '100%',
    opacity: 0.7,
    // resizeMode: 'cover',
  },

  userNicknameContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 15,
    marginBottom: 20,
  },

  userChallengeStateContainer: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
  },

  inProgressChallenge: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  totalChallenges: {
    flex: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  successChallenge: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  change: {
    flex: 1,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  userInfoEtc: {
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
  },
});
