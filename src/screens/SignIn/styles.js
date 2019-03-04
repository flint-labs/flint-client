import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.7,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 2,
    marginBottom: 10,
  },
  headerButton: {
    flexDirection: 'row',
    marginLeft: 10,
    paddingRight: 30,
    alignItems: 'center',
  },
});
