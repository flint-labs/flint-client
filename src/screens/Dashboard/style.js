import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1 },
  sloganContainer: { flex: 0.2, justifyContent: 'center', alignItems: 'center' },
  progressContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  doItContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  doItText: { fontSize: 30 },
  sloganText: { fontSize: 20, fontWeight: 'bold' },
  runImage: { width: 30, height: 30 },
  lineImage: { width: '80%', height: '15%' },
  modalTextInput: {
    width: '90%',
    height: '40%',
    justifyContent: 'center',
    flex: 1,
    fontSize: 20,
  },
  imageRefBtn: { flex: 1, justifyContent: 'center', width: '40%' },
  modalTextInputContainer: {
    flex: 1.5,
    marginTop: '25%',
    alignItems: 'center',
  },
  submitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6600',
    width: '95%',
    flex: 1,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#dcdcdc',
    shadowOpacity: 1.0,
  },
  submitBtnContainer: {
    alignItems: 'center',
    height: '27%',
  },
  submitText: { fontSize: 20, color: 'white', fontWeight: 'bold' },
  reportEntryContainer: {
    height: 80,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 17,
    color: '#007AFF',
  },
  subView: {
    position: 'absolute',
    top: -200,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    height: 200,
    borderRadius: 5,
  },
  ChallengeListButton: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    paddingHorizontal: '5%',
  },
  reportEntryBackgroundImg: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  reportEntryTitle: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: 25,
    // flex: 1,
  },
});

export default styles;
