import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  historyEntry: {
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
  },
  bodyContainer: {
    flex: 2,
    marginTop: 10,
    color: '#333',
  },
  titleText: { fontSize: 20, fontWeight: 'bold' },
  descriptionText: { fontSize: 13, marginTop: 5 },
  stateText: { fontSize: 15, fontWeight: 'bold', marginTop: 5 },
  historyReportEntryBackgroundImg: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    padding: 20,
    height: 100,
    marginVertical: 10,
  },
  historyReportEntryTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
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
    marginLeft: 20,
  },
  subContainerEntry: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 20,
    marginVertical: 10,
  },
  HistoryDetailTitle: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
  },
  HistoryDetailSubContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    backgroundColor: '#f2f2f2',
  },
});

export default styles;
