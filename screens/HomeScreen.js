import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import HomeBanner from '../components/HomeBanner';

import hermanMillerImage from '../assets/hermanmiller.jpg';
import keyboardImage from '../assets/keyboard.jpg';
import standingDeskImage from '../assets/standingdesk.jpg';

const HomeScreen = ({ navigation }) => {
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
          <TouchableOpacity 
            style={styles.productCard} 
            onPress={() => navigation.navigate('Details', {
              productImage: hermanMillerImage,
              title: 'Herman Miller Chair!',
              price: '$1200',
              description: 'The Herman Miller Aeron Chair is the most comfortable office chair you can buy. It prevents back pain and improves posture.'
            })}
          >
            <ProductCard 
              title='Herman Miller Chair'
              price='$1200'
              productImage={hermanMillerImage}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.productCard} 
            onPress={() => navigation.navigate('Details', {
              productImage: keyboardImage,
              title: 'Mechanical Keyboard',
              price: '$150',
              description: 'The Keycron K6 is a compact 65% keyboard with hot-swappable switches. It is perfect for gaming and typing.'
            })}
          >
            <ProductCard 
              title='Mechanical Keyboard'
              price='$150'
              productImage={keyboardImage}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigation.navigate('Details', {
              productImage: standingDeskImage,
              title: 'Standing Desk',
              price: '$300',
              description: 'The Flexispot Standing Desk is a height-adjustable desk that allows you to work while standing. It improves productivity and health.'
            })}
          >
            <ProductCard 
              title='Standing Desk'
              price='$300'
              productImage={standingDeskImage}
            />
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
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