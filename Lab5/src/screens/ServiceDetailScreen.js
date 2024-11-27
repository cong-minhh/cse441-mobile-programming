import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import {
  getServiceById,
  updateServiceById,
  deleteService,
} from '../api/ServicesAPI';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Menu, MenuItem} from 'react-native-material-menu';

const ServiceDetailScreen = ({route, navigation}) => {
  const {serviceId} = route.params;
  const [service, setService] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedService, setEditedService] = useState({
    name: '',
    price: '',
  });

  useEffect(() => {
    const loadService = async () => {
      const data = await getServiceById(serviceId);
      setService(data);
      setEditedService({
        name: data.name,
        price: data.price.toString(),
      });
    };
    loadService();
  }, [serviceId]);

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const handleEdit = () => {
    hideMenu();
    setShowEditModal(true);
  };

  const handleDelete = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to remove this service? This operation cannot be returned',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: async () => {
            try {
              await deleteService(serviceId);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete service');
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        name: editedService.name,
        price: parseInt(editedService.price, 10),
      };
      await updateServiceById(serviceId, updatedData);
      const updatedService = await getServiceById(serviceId);
      setService(updatedService);
      setShowEditModal(false);
      Alert.alert('Success', 'Service updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update service');
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#EF506B',
      },
      headerTintColor: '#fff',
      headerTitle: 'Service detail',
      headerRight: () => (
        <Menu
          visible={visible}
          anchor={
            <TouchableOpacity onPress={showMenu}>
              <Icon
                name="edit"
                size={24}
                color="#fff"
                style={{marginRight: 16}}
              />
            </TouchableOpacity>
          }
          onRequestClose={hideMenu}>
          <MenuItem onPress={handleEdit}>Edit</MenuItem>
        </Menu>
      ),
    });
  }, [handleEdit, navigation, visible]);

  const formatDateTime = dateString => {
    const date = new Date(dateString);
    const padZero = num => num.toString().padStart(2, '0');
    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  if (!service) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

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

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Icon
            name="delete"
            size={24}
            color="#fff"
            style={styles.deleteIcon}
          />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <Modal visible={showEditModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Service</Text>
            <TextInput
              style={styles.input}
              placeholder="Service name"
              value={editedService.name}
              onChangeText={text =>
                setEditedService({...editedService, name: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={editedService.price}
              onChangeText={text =>
                setEditedService({...editedService, price: text})
              }
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdate}>
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowEditModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  deleteButton: {
    backgroundColor: '#EF506B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  deleteIcon: {
    marginRight: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#EF506B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
  updateButton: {
    backgroundColor: '#EF506B',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default ServiceDetailScreen;
