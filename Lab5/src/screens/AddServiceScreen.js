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
import {addService} from '../api/ServicesAPI';

const AddServiceScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#EF506B',
      },
      headerTintColor: '#fff',
      headerTitle: 'Service',
    });
  }, [navigation]);

  const handleAddService = async () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      await addService({name, price: parseInt(price)});
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add service.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#EF506B" barStyle="light-content" />

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Service name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Input a service name"
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
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
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

export default AddServiceScreen;
