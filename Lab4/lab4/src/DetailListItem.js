import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const DetailListItem = ({type, detail}) => {
  let iconName;

  switch (type) {
    case 'Email':
      iconName = 'email';
      break;
    case 'Work':
      iconName = 'phone';
      break;
    case 'Personal':
      iconName = 'smartphone';
      break;
    default:
      iconName = 'info';
  }

  return (
    <View style={styles.container}>
      <Icon name={iconName} color="#000" size={24} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{type}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
  detail: {
    color: '#1e90ff',
  },
});

export default DetailListItem;
