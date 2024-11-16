import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import AddServiceScreen from './src/screens/AddServiceScreen';
import ServiceDetailScreen from './src/screens/ServiceDetailScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
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
            options={{ headerShown: false }}
          >
            {props => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'HUYỀN TRINH' }}
            />
            <Stack.Screen
              name="AddService"
              component={AddServiceScreen}
              options={{ title: 'Service' }}
            />
            <Stack.Screen
              name="ServiceDetail"
              component={ServiceDetailScreen}
              options={{ title: 'Service Detail' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;