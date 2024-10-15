import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

function EmployeeForm() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [specialization, setSpecialization] = useState('');

  const handleUpdate = () => {
    Alert.alert('Success', 'Employee information updated successfully!');
  };

  return (
    <View>
      <Text>Full Name:</Text>
      <TextInput
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        placeholder="Enter full name"
      />
      <Text>Age:</Text>
      <TextInput
        value={age}
        onChangeText={(text) => setAge(text)}
        placeholder="Enter age"
        keyboardType="numeric"
      />
      <Text>Occupation:</Text>
      <TextInput
        value={occupation}
        onChangeText={(text) => setOccupation(text)}
        placeholder="Enter occupation"
      />
      <Text>Specialization:</Text>
      <TextInput
        value={specialization}
        onChangeText={(text) => setSpecialization(text)}
        placeholder="Enter specialization"
      />
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
}

export default EmployeeForm;
