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
});
