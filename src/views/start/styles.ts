import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
  },
  searchBox: {
    height: 40,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  listItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(30, 30, 30)',
    margin: 3,
    padding: 8,
    height: 80,
  },
  itemText: {
    color: 'white',
    flex: 1,
  },
});
