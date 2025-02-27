import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import HomeBanner from '../components/HomeBanner';

const HomeScreen = ({ navigation }) => {

  const handleProductPress = () => {
    console.log('Product Pressed');
    navigation.navigate('Details');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <HomeBanner style={styles.homebanner} />
        <Text style={styles.subtitle}>Featured Products</Text>
        <View style={styles.productGrid}>
          <TouchableOpacity style={styles.productCard} onPress={handleProductPress}>
            <ProductCard />
          </TouchableOpacity>
          <TouchableOpacity style={styles.productCard} onPress={handleProductPress}>
            <ProductCard />
          </TouchableOpacity>
          <TouchableOpacity style={styles.productCard} onPress={handleProductPress}>
            <ProductCard />
          </TouchableOpacity>
          <TouchableOpacity style={styles.productCard} onPress={handleProductPress}>
            <ProductCard />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
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
    width: '100%',
    // i need 2 columns on each row
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  productCard: {
    width: '45%',
  }
});

export default HomeScreen;