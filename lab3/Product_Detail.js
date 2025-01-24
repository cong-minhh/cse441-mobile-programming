import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
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

const ProductDetail = () => {
  const [data, setData] = useState(null);
  const filePath = 'https://dummyjson.com/products/2';

  useEffect(() => {
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  // console.log(data);
  return (
    <View style={styles.container}>
      {data ? (
        <ProductCard product={data} />
      ) : (
        <Paragraph>Loading...</Paragraph>
      )}
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
  card: {
    marginBottom: 10,
  },
});

export default ProductDetail;
