import {ScrollView, View} from 'react-native';
import data from './Data';
import Square from './Square';
import styles from './style';

import React from 'react';
import EmployeeForm from './EmployeeForm';

export default function App() {
  return (
    <View>
      <ScrollView style={styles.container}>
        {data.map((item, index) => (
          <Square key={item} text={`Square ${index + 1}`} />
        ))}
      </ScrollView>
      <EmployeeForm/>
    </View>
  );
}
