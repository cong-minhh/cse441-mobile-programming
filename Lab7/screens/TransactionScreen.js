import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../components/CustomHeader';

const TransactionScreen = ({navigation}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/Transactions',
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('TransactionDetail', {transactionId: item._id})
        }>
        <View>
          <Text style={styles.idDate}>
            {item.id} -{' '}
            {new Date(item.createdAt).toLocaleString('en-US', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
            {item.status === 'cancelled' && (
              <Text style={styles.cancelled}> - Cancelled</Text>
            )}
          </Text>

          {item.services.map((service, index) => (
            <View key={index} style={styles.serviceRow}>
              <Text style={styles.bullet}>-</Text>
              <Text style={styles.serviceText}>{service.name}</Text>
            </View>
          ))}

          <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>

          <Text style={styles.customerText}>
            Customer: {item.customer?.name || 'N/A'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAddButton = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AddTransaction')}
      style={styles.addButton}>
      <Icon name="add" size={24} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Transaction"
        navigation={navigation}
        rightComponent={renderAddButton()}
        containerStyle={styles.headerContainer}
      />
      <FlatList
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {loading ? 'Loading...' : 'No transactions found'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#e91e63',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingVertical: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  idDate: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  bullet: {
    marginRight: 8,
    color: '#666',
  },
  serviceText: {
    flex: 1,
    color: '#666',
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 4,
  },
  customerText: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  cancelled: {
    color: '#FF0000',
    fontWeight: '500',
  },
  addButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default TransactionScreen;
