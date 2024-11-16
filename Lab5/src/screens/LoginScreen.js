import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../Styles';
import {login} from '../api/ServicesAPI';

const LoginScreen = ({onLoginSuccess}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const token = await login(phone, password);
      if (token) {
        await AsyncStorage.setItem('token', token);
        onLoginSuccess(); // Call the callback function to update authentication state
      } else {
        Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Phone"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
