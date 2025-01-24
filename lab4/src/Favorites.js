import 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ContactThumbnail from './ContactThumbnail';
const keyExtractor = ({phone}) => phone;

const Favorites = ({navigation}) => {
  const {contacts} = useSelector(state => state);
  const renderFavoriteThumbnail = ({item}) => {
    const {avatar} = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigation.navigate('ProfileContact', {contact: item})}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={keyExtractor}
        numColumns={3}
        contentContainerStyle={styles.list}
        renderItem={renderFavoriteThumbnail}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'while',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },
});
export default Favorites;
