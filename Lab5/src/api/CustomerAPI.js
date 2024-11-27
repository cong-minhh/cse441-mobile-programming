import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://kami-backend-5rs0.onrender.com';

export const login = async (phone, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth`, {phone, password});
    const token = response.data.token;
    await AsyncStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

export const getAllCustomers = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetch customers error:', error.message);
    throw error;
  }
};

export const addCustomer = async serviceData => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/customers`, serviceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Add service error:', error.message);
    throw error;
  }
};

export const getAllTransactions = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetch transactions error:', error.message);
    throw error;
  }
};
export const getTransactionById = async id => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetch transaction by ID error:', error.message);
    throw error;
  }
};
