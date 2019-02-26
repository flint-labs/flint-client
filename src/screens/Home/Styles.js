import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  indexContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    marginTop: 0,
    marginBottom: 0,
  },
  userFeedback: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 10,
    height: 270,
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
  feedbackContainer: {
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  feedbackEntryImgContainer: {
    width: width - 60,
    height: 180,
  },
  feedbackEntryImage: {
    flex: 1,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
});

export default styles;
