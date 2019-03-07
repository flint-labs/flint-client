import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: { fontSize: 40, marginBottom: '10%' },
  buttonContainer: { flex: 1, width: '90%', marginTop: '10%' },
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
});

export default styles;
