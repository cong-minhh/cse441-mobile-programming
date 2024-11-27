import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import {addCustomer} from '../api/CustomersAPI';

const AddCustomerScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#EF506B',
      },
      headerTintColor: '#fff',
      headerTitle: 'Customer',
    });
  }, [navigation]);

  const handleAddCustomer = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      await addCustomer({name, phone});
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add customer.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#EF506B" barStyle="light-content" />

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Customer name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Input a customer name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Price <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddCustomer}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  required: {
    color: '#EF506B',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#EF506B',
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddCustomerScreen;
