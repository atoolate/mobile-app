import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import HomeBanner from '../components/HomeBanner';


const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://api.webflow.com/v2/sites/67ac9affa35b531aef6db98b/products/', 
      {
        headers: {
          Authorization: 
          "Bearer cc22c421d60b0d6f8ebe6f2344823dac0542ef47836c089eddf56f41d8f6a062",
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
        }))
      ))
      .catch(error => console.error(error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <HomeBanner style={styles.homebanner} />
        <Text style={styles.subtitle}>Featured Products</Text>
        <ScrollView 
          contentContainerStyle={styles.productGrid}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {products.map(product => (
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