import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchContactsSuccess, mapContacts} from './Store';
import ContactListItem from './ContactListItem';

const keyExtractor = ({phone}) => phone;

const fetchContacts = async () => {
  const data = await fetch('https://randomuser.me/api/?results=50');
  const contactData = await data.json();
  return contactData.results.map(mapContacts);
};

const Contacts = ({navigation}) => {
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchContacts()
      .then(contact => {
        dispatch(fetchContactsSuccess(contact));
      })
      .catch(e => {
        console.error(e);
      });
  }, [dispatch]);

  const renderContacts = ({item}) => {
    const {name, avatar, phone} = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate('ProfileContact', {contact: item})}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={keyExtractor}
        renderItem={renderContacts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Contacts;
