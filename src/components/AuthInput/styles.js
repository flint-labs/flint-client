import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  input: {
    flexDirection: 'row',
    width: width * 0.7,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 10,
  },
  inputElement: {
    fontSize: 17,
    width: width * 0.55,
    paddingLeft: 10,
  },
});
