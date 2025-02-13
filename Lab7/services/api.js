import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://kami-backend-5rs0.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Current token:', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(
          'Added Authorization header:',
          config.headers.Authorization,
        );
      } else {
        console.log('No token found in AsyncStorage');
      }
      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('userToken');
      // You might want to trigger a navigation to login screen here
    }
    return Promise.reject(error);
  },
);

export const authAPI = {
  login: async (phoneNumber, password) => {
    try {
      const response = await api.post('/auth/', {phoneNumber, password});
      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },
  logout: async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
};

export const servicesAPI = {
  getAll: async () => {
    const response = await api.get('/services');
    return response.data;
  },
  getById: async id => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },
  create: async serviceData => {
    const response = await api.post('/services', serviceData);
    return response.data;
  },
  update: async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  },
  delete: async id => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
};

export const customersAPI = {
  getAll: async () => {
    const response = await api.get('/customers');
    return response.data;
  },
  create: async customerData => {
    const response = await api.post('/customers', customerData);
    return response.data;
  },
};

export const transactionsAPI = {
  getAll: async () => {
    const response = await api.get('/transactions');
    return response.data;
  },
  getById: async id => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },
  cancel: async transactionId => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Making cancel request for transaction:', transactionId);
      const response = await api.put(`/transactions/${transactionId}`, {
        status: 'cancelled',
      });
      console.log('Cancel response:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Cancel error details:',
        error.response?.data || error.message,
      );
      throw error;
    }
  },
};
