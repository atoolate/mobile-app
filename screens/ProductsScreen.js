import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import FilterBox from '../components/FilterBox';
import ProductCard from '../components/ProductCard';
import { API_URL, BEARER_TOKEN } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';


const categoryNames = {
  "" : "All",
  "67c5e911ad7bc8bcd0984527": "Monitors",
  "67c5e84532d25aad14815318": "Desks",
  "67c5e835338983ed22cfa9fe": "Keyboards",
  "67c5e8263f065ae8614f3a21": "Chairs"
};

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch(API_URL, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    })
      .then(response => response.json())
      .then(data => setProducts(
        data.items.map(item => ({
          id: item.product.id,
          title: item.product.fieldData.name,
          subtitle: item.product.fieldData.description,
          price: (item.skus[0]?.fieldData.price.value || 0) / 100,
          image: {uri: item.skus[0]?.fieldData["main-image"]?.url},
          category: categoryNames[item.product.fieldData.category[0]] || "No Category",
        }))
      ))
      .catch(error => console.error(error));
  }, []);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('wishlist').then(data => {
        if (data) setWishlist(JSON.parse(data));
        else setWishlist([]);
      });
    }, [])
  );

  const toggleWishlist = (product) => {
    let updated;
    if (wishlist.some(item => item.id === product.id)) {
      updated = wishlist.filter(item => item.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }
    setWishlist(updated);
    AsyncStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "" || product.category === selectedCategory)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") { return a.price - b.price; }
    if (sortOption === "price-desc") { return b.price - a.price; }
    if (sortOption === "name-asc") { return a.title.localeCompare(b.title); }
    if (sortOption === "name-desc") { return b.title.localeCompare(a.title); }
  });

  const uniqueCategories = [...new Set(products.map(p => p.category))];

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <TextInput
            style={styles.searchbar}
            placeholder="Search products"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FilterBox
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={uniqueCategories}
            sortOption={sortOption}
            setSortOption={setSortOption}
            pickerStyle={styles.picker}
          />
          <View style={styles.productGrid}>
            {(() => {
              const rows = [];
              for (let i = 0; i < sortedProducts.length; i += 2) {
                rows.push(
                  <View key={i} style={styles.productRow}>
                    {[sortedProducts[i], sortedProducts[i + 1]].map((product, idx) =>
                      product && (
                        <View key={product.id} style={styles.productCard}>
                          <TouchableOpacity
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
                          <TouchableOpacity
                            style={styles.wishlistIcon}
                            onPress={() => toggleWishlist(product)}
                          >
                            <AntDesign
                              name={wishlist.some(item => item.id === product.id) ? 'heart' : 'hearto'}
                              size={28}
                              color={wishlist.some(item => item.id === product.id) ? '#e74c3c' : 'white'}
                            />
                          </TouchableOpacity>
                        </View>
                      )
                    )}
                  </View>
                );
              }
              return rows;
            })()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: '100%',
  },
  productGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
  },
  picker: {
    height: 50,
    width: '48%',
    backgroundColor: '#fff',
  },
  searchbar: {
    height: 40,
    borderColor: '#1a1a1a',
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    width: '100%',
    alignSelf: 'center',
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  wishlistIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ProductsScreen;
