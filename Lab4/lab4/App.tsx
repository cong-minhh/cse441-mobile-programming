import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProfileContact from './src/ProfileContact';
import Favorites from './src/Favorites';
import Contacts from './src/Contact';
import Store from './src/Store';
// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function ContactsScreens() {
  return (
    <Drawer.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: true,
      }}>
      <Drawer.Screen
        name="Contacts"
        component={Contacts}
        options={{ title: 'Contacts' }}
      />
      <Drawer.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: 'Profile contact' }}
      />  
    </Drawer.Navigator>
  );
}

function FavoriteScreens() {
  return (
    <Drawer.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerShown: true,
      }}>
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: 'Favorites' }}
      />
      <Drawer.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: 'Profile contact' }}
      />
    </Drawer.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="ContactsScreens"
      barStyle={{ backgroundColor: 'blue' }}
      labeled={false}
      activeColor={'#D3D3D3'}
      inactiveColor={'#A9A9A9'}>
      <Tab.Screen
        name="Contacts"
        component={ContactsScreens}
        options={{
          tabBarIcon: 'format-list-bulleted',
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreens}
        options={{
          tabBarIcon: 'star-check',
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
