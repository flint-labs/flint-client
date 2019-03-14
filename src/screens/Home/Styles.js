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
    resizeMode: 'cover',
  },
  challengeContainer: {
    flex: 2,
  },
  userFeedback: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 10,
    marginBottom: 20,
    height: 270,
    justifyContent: 'center',
  },
  categoryEntryImgContainer: {
    width: width - 40,
    height: width / 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,

    shadowOffset: { width: 0, height: 1.5 },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    elevation: 1,
  },
  categoryEntryImage: {
    flex: 1,
    width: width - 40,
    height: width / 2.5,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  categoryEntryImageBlur: {
    backgroundColor: 'rgba(0, 0, 0,0.5)',
    width: width - 40,
    height: width / 2.5,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
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
  headerLeftButton: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
});

export default styles;
