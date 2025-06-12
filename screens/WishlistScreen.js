import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const WishlistScreen = ({navigation}) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const loadWishlist = async () => {
      const data = await AsyncStorage.getItem('wishlist');
      if (data) setWishlist(JSON.parse(data));
    };
    const unsubscribe = loadWishlist();
    return () => unsubscribe;
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadWishlist = async () => {
        const data = await AsyncStorage.getItem('wishlist');
        if (data) setWishlist(JSON.parse(data));
        else setWishlist([]);
      };
      loadWishlist();
    }, [])
  );

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    AsyncStorage.setItem('wishlist', JSON.stringify(updated));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {wishlist.length === 0 ? (
          <Text style={styles.empty}>Your wishlist is empty.</Text>
        ) : (
          wishlist.map(product => (
            <TouchableOpacity 
              key={product.id} 
              style={styles.productCard}
              onPress={() => navigation.navigate('Product Detail', {
                  productImage: product.image,
                  title: product.title,
                  price: product.price,
                  description: product.subtitle,
              })}
            >
              <ProductCard
                title={product.title} 
                price={product.price}
                productImage={product.image}
                style={{ productTitle: { height: 30 } }} // override title height
              />
              <TouchableOpacity
                style={styles.wishlistIcon}
                onPress={() => removeFromWishlist(product.id)}
              >
                <AntDesign name="delete" size={24} color="#e74c3c" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
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
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: '100%',
    paddingTop: 20,
  },
  empty: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 40,
  },
  productCard: {
    position: 'relative',
  },
  wishlistIcon: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 2,
  },
});

export default WishlistScreen;
