import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {getServiceById} from '../api/ServicesAPI';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ServiceDetailScreen = ({route, navigation}) => {
  const {serviceId} = route.params;
  const [service, setService] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      const data = await getServiceById(serviceId);
      setService(data);
    };
    loadService();
  }, [serviceId]);

  useEffect(() => {
    // Configure header style
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#EF506B',
      },
      headerTintColor: '#fff',
      headerTitle: 'Service detail',
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

  if (!service) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const formatDateTime = dateString => {
    const date = new Date(dateString);

    const padZero = num => num.toString().padStart(2, '0');

    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#EF506B" barStyle="light-content" />

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Service name:</Text>
          <Text style={styles.value}>{service.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>{service.price} đ</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Creator:</Text>
          <Text style={styles.value}>{service.user.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{formatDateTime(service.createdAt)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Final update:</Text>
          <Text style={styles.value}>{formatDateTime(service.updatedAt)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  infoRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
});

export default ServiceDetailScreen;
