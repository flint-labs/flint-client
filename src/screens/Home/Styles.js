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
    flex: 2,
    // marginTop: 90,
    // marginBottom: 10,
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
    // height: 100,
    // // width: width / 2 - 15,
    // width: width / 3.5,
    // marginRight: 15,

    // marginLeft: 10,
    // marginTop: 10,

    width: width / 3 - 16,
    height: width / 3 - 16,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    borderRadius: 10,
  },
  categoryEntryImage: {
    flex: 1,
    margin: 6,
    width: width / 3 - 16,
    height: width / 3 - 16,
    resizeMode: 'cover',
  },
  categoryEntryImageBlur: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: width / 3 - 16,
    height: width / 3 - 16,
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: '#dcdcdc',

    borderWidth: 1,
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
});

export default styles;
