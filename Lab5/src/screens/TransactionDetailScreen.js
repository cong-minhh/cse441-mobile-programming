import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../styles/loginStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getTransactionById} from '../api/CustomerAPI';

export default function TransactionDetailScreen({route, navigation}) {
  const {id} = route.params;
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      const data = await getTransactionById(id);
      setTransaction(data);
    };
    loadService();
  }, [id]);

  useEffect(() => {
    // Configure header style
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#EF506B',
      },
      headerTintColor: '#fff',
      headerTitle: 'Transaction detail',
      headerRight: () => (
        <Icon
          name="more-vert"
          size={24}
          color="#fff"
          style={{marginRight: 16}}
        />
      ),
    });
  }, [navigation]);

  if (!transaction) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Detail</Text>
      <Text>ID: {transaction._id}</Text>
      <Text>Customer: {transaction.customer?.name}</Text>
      <Text>Amount: ${transaction.amount}</Text>
      <Text>Date: {new Date(transaction.date).toLocaleDateString()}</Text>
    </View>
  );
}
