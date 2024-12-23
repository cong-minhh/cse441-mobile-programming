import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Home' : 'Login'}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#EF506B',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
          },
        }}>
        {!isAuthenticated ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
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
              name="TransactionDetail"
              component={TransactionDetailScreen}
              options={{title: 'Transaction Detail'}}
            />
            <Stack.Screen
              name="AddCustomer"
              component={AddCustomerScreen}
              options={{title: 'Add Customer'}}
            />
            <Stack.Screen
              name="Customers"
              component={CustomerScreen}
              options={{title: 'Customers'}}
            />
            <Stack.Screen
              name="DeleteService"
              component={DeleteServiceScreen}
              options={{title: 'Delete Service'}}
            />
            <Stack.Screen
              name="EditService"
              component={EditServiceScreen}
              options={{title: 'Edit Service'}}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{title: 'Settings'}}
            />
            <Stack.Screen
              name="Transactions"
              component={TransactionScreen}
              options={{title: 'Transactions'}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
