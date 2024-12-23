import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/styles';

const TransactionScreen = ({navigation}) => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/transactions',
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      setTransactions(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch transactions');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTransactions();
    });
    return unsubscribe;
  }, [navigation]);

  const formatDate = dateString => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.transactionCard}
      onPress={() =>
        navigation.navigate('TransactionDetail', {transaction: item})
      }>
      <Text style={styles.transactionIdDate}>
        {`${item.id} - ${formatDate(item.createdAt)}`}
        {item.status === 'cancelled' && (
          <Text style={styles.transactionCancelled}> - Cancelled</Text>
        )}
      </Text>
      <View style={styles.transactionServices}>
        {item.services.map((service, index) => (
          <Text key={index} style={styles.transactionServiceItem}>
            - {service.name}
          </Text>
        ))}
      </View>
      <View style={styles.transactionCustomerRow}>
        <Text style={styles.transactionCustomerLabel}>Customer:</Text>
        <Text style={styles.transactionCustomerName}>
          {item.customer?.name || 'Unknown'}
        </Text>
      </View>
      <Text style={styles.transactionPrice}>
        {Number(item.price).toLocaleString('vi-VN')} đ
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingVertical: 10}}
      />
    </View>
  );
};

export default TransactionScreen;
