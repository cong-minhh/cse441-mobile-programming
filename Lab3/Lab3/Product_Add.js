import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const ProductAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState('');

  const handleSubmit = () => {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        discountPercentage: discountPercentage,
        rating: rating,
        stock: stock,
        brand: brand,
        category: category,
        images: images,
      }),
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        Alert.alert('Add successful');
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Failed to add product');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add a Product</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Discount Percentage</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Discount Percentage"
          keyboardType="numeric"
          value={discountPercentage}
          onChangeText={setDiscountPercentage}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rating</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter rating"
          keyboardType="numeric"
          value={rating}
          onChangeText={setRating}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Stock</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter stock"
          keyboardType="numeric"
          value={stock}
          onChangeText={setStock}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Brand</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter brand"
          value={brand}
          onChangeText={setBrand}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter category"
          value={category}
          onChangeText={setCategory}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Images</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter images"
          value={images}
          onChangeText={setImages}
        />
      </View>

      <Button title="SUBMIT" onPress={handleSubmit} color="#007AFF" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0000FF',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default ProductAdd;
