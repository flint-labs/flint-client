import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: { fontSize: 40, marginBottom: '10%' },
  buttonContainer: { flex: 1 },
  button: {
    backgroundColor: '#ff6600',
    borderRadius: 5,
    justifyContent: 'center',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#dcdcdc',
    shadowOpacity: 1.0,
    alignItems: 'center',
  },
  buttonText: { fontSize: 20, color: 'white', fontWeight: 'bold' },
  donationInput: {
    flex: 0.5,
    fontSize: 15,
    width: width * 0.7,
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#dcdcdc',
    textAlignVertical: 'top',
  },
  headerContainer: {
    marginTop: 35,
    flex: 0.3,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 0.5,
  },
  failureImageContainer: {
    flex: 1.5,
    marginRight: '5%',
    alignItems: 'flex-start',
  },
});

export default styles;
