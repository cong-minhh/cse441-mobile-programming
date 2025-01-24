/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, View, Text, Alert, Button} from 'react-native';
import ContactThumbnail from './ContactThumbnail';
import DetailListItem from './DetailListItem.js';
import {IconButton} from 'react-native-paper';
const ProfileContact = ({route}) => {
  const {contact} = route.params;
  const {id, avatar, name, email, phone, cell, favorite} = contact;
  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={styles.detailsSection}>
        <DetailListItem icon="mail" type="Email" detail={email} />
        <DetailListItem icon="phone" type="Work" detail={phone} />
        <DetailListItem icon="smartphone" type="Personal" detail={cell} />
        <View style={{alignItems: 'center'}}>
          <IconButton
            icon={favorite === true ? 'star-check' : 'star-check-outline'}
            iconColor="#663399"
            size={20}
            onPress={() => {
              // updateFavorite();
            }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {},
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'blue',
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default ProfileContact;
