import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import styles from '../styles/loginStyle';
import {getAllCustomers} from '../api/CustomerAPI';

export default function CustomerScreen({navigation}) {
  const [customers, setCustomers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadCustomers = async () => {
    try {
      const customerList = await getAllCustomers();
      setCustomers(customerList);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadCustomers();
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCustomers();
    });

    return unsubscribe;
  }, [navigation]);

  const handleAddCustomer = () => {
    navigation.navigate('AddCustomer');
  };

  const renderItem = ({item}) => (
    <View style={styles.customerItem}>
      <Text>Name: {item.name}</Text>
      <Text>Phone: {item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddCustomer}>
        <Text style={styles.addButtonText}>Add Customer</Text>
      </TouchableOpacity>
      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
