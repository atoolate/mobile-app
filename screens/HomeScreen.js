import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import { StackActions } from '@react-navigation/native';

const HomeScreen = ({navigation}) => {

    const handleProductPress = () => {
        console.log('Product Pressed');
        navigation.navigate('Details');
    };
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Build your dream Home Office</Text>
      <Image 
        style={styles.image} 
        source={require('../assets/homeofficehero.jpg')} 
      />

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  image: {
    width: 500,
    height: 200,
  },
  productGrid: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
  }
});

export default HomeScreen;