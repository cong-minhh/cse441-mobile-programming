import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/CustomHeader';

const AddTransactionScreen = ({navigation}) => {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchCustomersAndServices();
  }, []);

  useEffect(() => {
    // Calculate total amount whenever selected services change
    const total = selectedServices.reduce((sum, service) => {
      const serviceInfo = services.find(s => s._id === service.serviceId);
      return sum + (serviceInfo?.price || 0) * (service.quantity || 1);
    }, 0);
    setTotalAmount(total);
  }, [selectedServices, services]);

  const fetchCustomersAndServices = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const headers = {Authorization: `Bearer ${token}`};

      const [customersResponse, servicesResponse] = await Promise.all([
        axios.get('https://kami-backend-5rs0.onrender.com/Customers', {
          headers,
        }),
        axios.get('https://kami-backend-5rs0.onrender.com/Services', {headers}),
      ]);

      setCustomers(customersResponse.data);
      setServices(servicesResponse.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      Alert.alert('Error', 'Failed to load customers and services');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...selectedServices];
    newServices[index] = {...newServices[index], [field]: value};
    setSelectedServices(newServices);
  };

  const handleSubmit = async () => {
    if (!selectedCustomer || selectedServices.length === 0) {
      Alert.alert('Error', 'Please select a customer and at least one service');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      const selectedServicesData = selectedServices.map(s => {
        const serviceInfo = services.find(srv => srv._id === s.serviceId);
        return {
          _id: serviceInfo._id,
          quantity: parseInt(s.quantity) || 1,
        };
      });

      const requestData = {
        customerId: selectedCustomer,
        services: selectedServicesData,
      };

      console.log('Sending request with data:', requestData);

      const response = await axios.post(
        'https://kami-backend-5rs0.onrender.com/transactions',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Response:', response.data);
      Alert.alert('Success', 'Transaction added successfully');
      navigation.goBack();
    } catch (error) {
      console.error(
        'Failed to add transaction:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', 'Failed to add transaction. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Add Transaction"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="Add transaction" navigation={navigation} />
      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Customer *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCustomer}
              onValueChange={value => setSelectedCustomer(value)}
              style={styles.picker}>
              <Picker.Item label="Select customer" value="" />
              {customers.map(customer => (
                <Picker.Item
                  key={customer._id}
                  label={customer.name}
                  value={customer._id}
                />
              ))}
            </Picker>
          </View>
        </View>

        {services.map((service, index) => (
          <View key={service._id} style={styles.serviceItem}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                selectedServices.some(s => s.serviceId === service._id) &&
                  styles.checkboxChecked,
              ]}
              onPress={() => {
                const isSelected = selectedServices.some(
                  s => s.serviceId === service._id,
                );
                if (isSelected) {
                  setSelectedServices(
                    selectedServices.filter(s => s.serviceId !== service._id),
                  );
                } else {
                  setSelectedServices([
                    ...selectedServices,
                    {serviceId: service._id, quantity: 1},
                  ]);
                }
              }}>
              {selectedServices.some(s => s.serviceId === service._id) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>
                {service.price.toLocaleString()} ₫
              </Text>
              {selectedServices.some(s => s.serviceId === service._id) && (
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                      const currentService = selectedServices.find(
                        s => s.serviceId === service._id,
                      );
                      if (currentService && currentService.quantity > 1) {
                        handleServiceChange(
                          selectedServices.findIndex(
                            s => s.serviceId === service._id,
                          ),
                          'quantity',
                          currentService.quantity - 1,
                        );
                      }
                    }}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>
                    {selectedServices.find(s => s.serviceId === service._id)
                      ?.quantity || 1}
                  </Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                      const currentService = selectedServices.find(
                        s => s.serviceId === service._id,
                      );
                      if (currentService) {
                        handleServiceChange(
                          selectedServices.findIndex(
                            s => s.serviceId === service._id,
                          ),
                          'quantity',
                          (currentService.quantity || 1) + 1,
                        );
                      }
                    }}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.summaryButton} onPress={handleSubmit}>
        <Text style={styles.summaryButtonText}>
          See summary: ({totalAmount.toLocaleString()} ₫)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF4B81',
    borderColor: '#FF4B81',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: '#FF4B81',
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#666',
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  summaryButton: {
    backgroundColor: '#FF4B81',
    padding: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  summaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddTransactionScreen;
