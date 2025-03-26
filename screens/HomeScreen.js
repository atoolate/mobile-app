import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import HomeBanner from '../components/HomeBanner';
import { API_URL, BEARER_TOKEN } from 'react-native-dotenv';
import { Picker } from '@react-native-picker/picker';

const categoryNames = {
  "" : "All",
  "67c5e911ad7bc8bcd0984527": "Monitors",
  "67c5e84532d25aad14815318": "Desks",
  "67c5e835338983ed22cfa9fe": "Keyboards",
  "67c5e8263f065ae8614f3a21": "Chair"
}


const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch(API_URL, 
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      } 
    )
      .then(response => response.json())
      .then(data => setProducts(
        data.items.map(item => ({
          id: item.product.id,
          title: item.product.fieldData.name,
          subtitle: item.product.fieldData.description,
          price: (item.skus[0]?.fieldData.price.value || 0) / 100,
          image: {uri: item.skus[0]?.fieldData["main-image"]?.url},
          category:
            categoryNames[item.product.fieldData.category[0]] || "No Category",
        }))
      ))
      .catch(error => console.error(error));
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <HomeBanner style={styles.homebanner} />
        <Text style={styles.subtitle}>Featured Products</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
          style={styles.picker} 
        >
          <Picker.Item label="All" value="" />
          {[...new Set(products.map(p => p.category))].map(category => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
        <ScrollView 
          contentContainerStyle={styles.productGrid}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {filteredProducts.map(product => (
            <TouchableOpacity 
              key={product.id}
              style={styles.productCard} 
              onPress={() => navigation.navigate('Details', {
                productImage: product.image,
                title: product.title,
                price: product.price,
                description: product.subtitle
              })}
            >
              <ProductCard 
                title={product.title}
                price={product.price}
                productImage={product.image}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
  },
  homebanner: {
    width: '100%',
    height: 200,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  productGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
    marginLeft: 5,
  },
  productCard: {
    width: 250,
    marginRight: 20,
  }
});

export default HomeScreen;