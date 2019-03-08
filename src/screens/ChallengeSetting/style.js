import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  headerLeftButton: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  pickerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: width * 0.7,
    fontSize: 25,
    marginTop: 40,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  paymentMethodBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.7,
  },
  paymentIcon: {
    width: 110,
    height: 110,
    marginBottom: 10,
    resizeMode: 'center',
    borderColor: '#DCDCDC',
    borderWidth: 1,
    borderRadius: 20,
  },
});
