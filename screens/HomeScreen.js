import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import HomeBanner from '../components/HomeBanner';
import { StackActions } from '@react-navigation/native';

const HomeScreen = ({navigation}) => {

    const handleProductPress = () => {
        console.log('Product Pressed');
        navigation.navigate('Details');
    };
    
  return (
    <View style={styles.container}>
      <HomeBanner style={styles.homebanner} />

      <Text style={styles.subtitle}>Featured Products</Text>

      <ScrollView style={styles.productGrid} vertical={true}>
        <TouchableOpacity onPress={handleProductPress}>
            <ProductCard />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProductPress}>
            <ProductCard />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProductPress}>
            <ProductCard />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProductPress}>
            <ProductCard />
        </TouchableOpacity>
      </ScrollView>     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  productGrid: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
  },
  homebanner: {
    width: 'max-content',
    height: 200,
    borderRadius: 10,
  },
});

export default HomeScreen;