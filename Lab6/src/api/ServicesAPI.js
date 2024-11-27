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

export const getAllServices = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetch services error:', error.message);
    throw error;
  }
};

export const addService = async serviceData => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL}/services`, // Added missing /services endpoint
      serviceData, // Use the entire serviceData object
      {
        headers: {
          // Fixed 'header' to 'headers'
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Add service error:', error.message);
    throw error;
  }
};

export const getServiceById = async id => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/services/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetch service by ID error:', error.message);
    throw error;
  }
};

export const updateServiceById = async (id, serviceData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.put(
      `${BASE_URL}/services/${id}`,
      serviceData, // Use the entire serviceData object
      {
        headers: {
          // Fixed 'header' to 'headers'
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Update service error:', error.message);
    throw error;
  }
};

export const deleteService = async id => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.delete(`${BASE_URL}/services/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Delete service error:', error.message);
    throw error;
  }
};
