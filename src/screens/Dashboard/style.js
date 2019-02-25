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
    justifyContent: 'center',
    alignItems: 'center',
  },
  doItText: { fontSize: 30 },
  sloganText: { fontSize: 30 },
  runImage: { width: '10%', height: '20%' },
  lineImage: { width: '80%', height: '15%' },
  modalTextInput: {
    width: '90%',
    height: '40%',
    borderWidth: 0.5,
    borderColor: '#dcdcdc',
    justifyContent: 'center',
    flex: 1,
    // backgroundColor: 'red',
  },
  imageRefBtn: { flex: 1, /* backgroundColor: 'blue', */ justifyContent: 'center' },
  modalTextInputContainer: {
    flex: 2,
    // backgroundColor: '#ff6600',
    marginTop: '25%',
    alignItems: 'center',
  },
  submitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6600',
    width: '95%',
    height: '30%',
    borderRadius: 5,
  },
  submitBtnContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '3%',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#dcdcdc',
    shadowOpacity: 1.0,
  },
  submitText: { fontSize: 20, color: 'white', fontWeight: 'bold' },
});

export default styles;
