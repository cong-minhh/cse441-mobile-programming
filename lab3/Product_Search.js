import React, {useState, useEffect} from 'react';
import {FlatList, View, TextInput, Button, StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

const ProductCard = ({product}) => (
  <Card style={styles.card}>
    <Title>Product Detail</Title>
    <Card.Cover style={styles.image} source={{uri: product.thumbnail}} />
    <Card.Content>
      <Title style={styles.title}>{product.title}</Title>
      <Paragraph>{product.description}</Paragraph>
      <Paragraph>Price: ${product.price}</Paragraph>
      <Paragraph>Discount: {product.discountPercentage}%</Paragraph>
      <Paragraph>Rating: {product.rating} stars</Paragraph>
      <Paragraph>Stock: {product.stock} units</Paragraph>
      <Paragraph>Brand: {product.brand}</Paragraph>
      <Paragraph>Category: {product.category}</Paragraph>
    </Card.Content>
  </Card>
);
const ProductList = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');

  const searchProduct = () => {
    let filePath = 'https://dummyjson.com/products';
    if (value !== '') {
      filePath = `https://dummyjson.com/products/search?q=${value}`;
    }
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
  };

  useEffect(() => {
    searchProduct();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={value}
        onChangeText={setValue}
      />
      <Button style={styles.button} title="Search" onPress={searchProduct} />
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ProductCard product={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 25,
  },
  image: {
    borderRadius: 30,
  },
  button: {
    margin: 50,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  card: {
    marginBottom: 10,
  },
});

export default ProductList;
