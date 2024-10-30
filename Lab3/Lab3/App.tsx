import React, { useState } from 'react';
import Products from './Products';
import ProductAdd from './Product_Add';
import ProductList from './Product_Search';
import ProductDetail from './Product_Detail';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomNavigation } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { routeKey: 'Products', title: 'Products', focusedIcon: 'shopping' },
    { routeKey: 'ProductAdd', title: 'Add', focusedIcon: 'account-multiple-plus' },
    { routeKey: 'ProductList', title: 'Search', focusedIcon: 'magnify' },
    { routeKey: 'ProductDetail', title: 'Detail', focusedIcon: 'information' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Products: Products,
    ProductAdd: ProductAdd,
    ProductList: ProductList,
    ProductDetail: ProductDetail,
  });

  const navigationState = {
    index,
    routes: routes.map(route => ({ key: route.routeKey, ...route })),
  };

  return (
    <SafeAreaProvider>
      <BottomNavigation
        navigationState={navigationState}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={styles.navigationBar}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationBar: {
    backgroundColor: '#f8f4ff',
  },
});

export default App;
