import {styles} from '../styles/loginStyle';
import React from 'react';
import {View, Button} from 'react-native';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingScreen({navigation}) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('loginToken');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
