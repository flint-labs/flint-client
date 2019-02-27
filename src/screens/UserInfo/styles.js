import { Dimensions, StyleSheet } from 'react-native';

const 살구색 = '#F8B195';
const 핑크색 = '#F67280';
// const 남색 = '#355C7D';
const 주황색 = '#FF6600';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  userInfoEntry: {
    fontSize: 20,
  },

  redButton: {
    color: 'red',
  },

  userInfoArea: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 살구색,
  },

  adBoxOuter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 핑크색,
  },

  adBoxInner: {
    flex: 1,
    backgroundColor: 주황색,
    margin: 10,
    minWidth: width - 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
