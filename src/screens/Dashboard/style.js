import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
  sloganContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
  },
  doItContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '5%',
  },
  doItText: { fontSize: 30 },
  sloganText: { fontSize: 30 },
  runImage: { width: '10%', height: '20%' },
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
    height: '27%',
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
});

export default styles;
