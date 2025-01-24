import React from 'react';
import {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Text, Button, Image} from 'react-native';

const Item = ({data}) => (
  <View style={styles.container}>
    <View style={styles.item}>
      <Image source={{uri: data.thumbnail}} style={styles.image} />
      <View style={styles.imageAndText}>
        <Text style={styles.title}>Title: {data.title}</Text>
        <Text style={styles.text}>Description: {data.description}</Text>
        <Text style={styles.text}>Price: {data.price}</Text>
        <Text style={styles.discount}>
          Discount: {data.discountPercentage} off
        </Text>
        <Text style={styles.text}>Rating: {data.rating}</Text>
        <Text style={styles.text}>Stock: {data.stock}</Text>
        <Text style={styles.text}>Brand: {data.brand}</Text>
        <Text style={styles.text}>Category: {data.category}</Text>
        <View style={styles.buttons}>
          <Button title="Detail" />
          <Button title="Add" />
          <Button title="Delete" />
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  imageAndText: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 5,
    width: 270,
    backgroundColor: '#F6F6F6',
    flex: 2,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
  },
  text: {
    fontSize: 12,
  },
  discount: {
    color: 'green',
  },
  titleBold: {
    fontSize: 40,
  },
});
export default function Products() {
  const [data, setData] = useState([]);
  const filePath = 'https://dummyjson.com/products/';

  useEffect(() => {
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d.products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
  return (
    <View>
      <Text style={styles.titleBold}>Product List:</Text>
      <FlatList
        data={data}
        renderItem={({item}) => <Item data={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
