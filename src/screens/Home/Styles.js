import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  img: {
    width,
    height: 200,
    resizeMode: 'cover',
  },
  challengeContainer: {
    flex: 1,
    marginBottom: 10,
  },
  userFeedback: {
    flex: 1,
    backgroundColor: 'green',
  },
  categoryEntryImgContainer: {
    height: 150,
    width: width / 2 - 15,
    marginLeft: 10,
    marginTop: 10,
  },
  categoryEntryImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  categoryEntryImageBlur: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: width / 2 - 15,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});

export default styles;
