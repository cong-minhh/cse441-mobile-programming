import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  displayContainer: {
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  displayText: {
    fontSize: 48,
    color: '#000',
  },
  buttonsContainer: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '22%',
    backgroundColor: '#fff',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
});
