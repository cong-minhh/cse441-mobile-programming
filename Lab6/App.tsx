import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './src/screens/HomeScreen';
import AddServiceScreen from './src/screens/AddServiceScreen';
import ServiceDetailScreen from './src/screens/ServiceDetailScreen';
import TransactionDetailScreen from './src/screens/TransactionDetailScreen';
import LoginScreen from './src/screens/LoginScreen';
import AddCustomerScreen from './src/screens/AddCustomerScreen';
import CustomerScreen from './src/screens/CustomerScreen';
import DeleteServiceScreen from './src/screens/DeleteServiceScreen';
import EditServiceScreen from './src/screens/EditServiceScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import TransactionScreen from './src/screens/TransactionScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#EF506B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
        },
      }}>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{title: 'KAMI'}}
      />
      <Stack.Screen
        name="AddService"
        component={AddServiceScreen}
        options={{title: 'Add Service'}}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{title: 'Service Detail'}}
      />
      <Stack.Screen
        name="EditService"
        component={EditServiceScreen}
        options={{title: 'Edit Service'}}
      />
      <Stack.Screen
        name="DeleteService"
        component={DeleteServiceScreen}
        options={{title: 'Delete Service'}}
      />
    </Stack.Navigator>
  );
};

const TransactionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#EF506B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
        },
      }}>
      <Stack.Screen
        name="TransactionsMain"
        component={TransactionScreen}
        options={{title: 'Transactions'}}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={{title: 'Transaction Detail'}}
      />
    </Stack.Navigator>
  );
};

const CustomerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#EF506B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
        },
      }}>
      <Stack.Screen
        name="CustomersMain"
        component={CustomerScreen}
        options={{title: 'Customers'}}
      />
      <Stack.Screen
        name="AddCustomer"
        component={AddCustomerScreen}
        options={{title: 'Add Customer'}}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#EF506B',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TransactionTab"
        component={TransactionStack}
        options={{
          tabBarLabel: 'Transaction',
          tabBarIcon: ({color, size}) => (
            <Icon name="receipt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CustomerTab"
        component={CustomerStack}
        options={{
          tabBarLabel: 'Customer',
          tabBarIcon: ({color, size}) => (
            <Icon name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="HomeMain" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
