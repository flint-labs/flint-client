import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  refereeEntry: {
    flex: 1,
    width: width - 40,
    height: 100,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 0.5,
    marginVertical: 10,
    flexDirection: 'row',
    paddingVertical: 13,
  },
  imageContainer: {
    flex: 2,
    borderRadius: 5,
  },
  bodyContainer: {
    flex: 3,
    color: '#333',
    justifyContent: 'center',
  },
  titleText: { fontSize: 15, fontWeight: 'bold' },
  descriptionText: { fontSize: 13, marginTop: 5 },
  stateText: { fontSize: 15, fontWeight: 'bold', marginTop: 5 },
  refereeRequestButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  refereeRequestImage: {
    flex: 1,
    width: width - 90,
    height: (height - 80) / 2,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  refereeRequestMessage: {
    flex: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
