import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import styles from '../styles/styles';
import {getAllTransactions} from '../api/CustomerAPI';

export default function TransactionScreen({navigation}) {
  const [transactions, setTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadTransactions = async () => {
    try {
      const transactionList = await getAllTransactions();
      setTransactions(transactionList);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadTransactions();
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTransactions();
    });

    return unsubscribe;
  }, [navigation]);

  const handleAddTransaction = () => {
    navigation.navigate('TransactionDetail');
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.transactionItem}
      onPress={() => handleAddTransaction}>
      <Text>Transaction ID: {item._id}</Text>
      <Text>Customer: {item.customer?.name}</Text>
      <Text>Amount: ${item.amount}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
