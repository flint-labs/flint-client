import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  historyEntryContainer: {
    height: 100,
    justifyContent: 'center',
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 0.5,
    marginLeft: '5%',
    marginRight: '5%',
    flex: 1,
  },
  titleText: { fontSize: 20, fontWeight: 'bold' },
  descriptionText: { fontSize: 13, marginTop: 5 },
  stateText: { fontSize: 15, fontWeight: 'bold', marginTop: 5 },
});

export default styles;
