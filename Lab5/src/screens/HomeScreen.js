import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DefaultTheme} from '@react-navigation/native';
import logo from '../../assets/spaLogo.jpg';
import {getAllServices} from '../api/ServicesAPI';

const HomeScreen = ({navigation}) => {
  const [services, setServices] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadServices = async () => {
    try {
      const servicesLst = await getAllServices();
      setServices(servicesLst);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadServices();
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadServices();
    });

    return unsubscribe;
  }, [navigation]);

  const handleAddService = () => {
    navigation.navigate('AddService');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.title}>
        <Text style={styles.titleText}>Danh sách dịch vụ</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
          <Icon name="plus-circle" size={25} color={AppTheme.colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.serviceList}
        data={services}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() =>
              navigation.navigate('ServiceDetail', {serviceId: item._id})
            }>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.servicePrice}>
              {item.price.toLocaleString()} đ
            </Text>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <View style={styles.footer}>
        <Icon name="home" size={25} color={AppTheme.colors.primary} />
        <Icon name="exchange" size={25} color="gray" />
        <Icon name="user" size={25} color="gray" />
        <Icon name="cog" size={25} color="gray" />
      </View>
    </View>
  );
};

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EF506B',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: AppTheme.colors.primary,
    padding: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  icon: {
    paddingRight: 10,
  },
  logo: {
    width: 300,
    height: 170,
    alignSelf: 'center',
    marginVertical: 20,
    // resizeMode: 'contain',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 5,
  },
  serviceList: {
    paddingHorizontal: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  serviceName: {
    fontSize: 16,
    color: '#333',
  },
  servicePrice: {
    fontSize: 16,
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});

export default HomeScreen;
