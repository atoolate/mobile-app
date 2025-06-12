import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import HomeBanner from '../components/HomeBanner';
import CustomHeader from '../components/CustomHeader';
import BlogRow from '../components/BlogRow';
import { API_URL, BEARER_TOKEN } from '@env';
import { BLOGS_API_URL } from '@env';
import { AntDesign } from '@expo/vector-icons';


const categoryNames = {
  "" : "All",
  "67c5e911ad7bc8bcd0984527": "Monitors",
  "67c5e84532d25aad14815318": "Desks",
  "67c5e835338983ed22cfa9fe": "Keyboards",
  "67c5e8263f065ae8614f3a21": "Chairs"
}


const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [latestBlog, setLatestBlog] = useState(null);

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
          category:
            categoryNames[item.product.fieldData.category[0]] || "No Category",
        }))
      ))
      .catch(error => console.error(error));

    // Fetch latest blog
    fetch(BLOGS_API_URL, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          // Sort by publication date descending
          const sorted = [...data.items].sort((a, b) => {
            const dateA = new Date(a.fieldData['publication-date'] || a.createdOn);
            const dateB = new Date(b.fieldData['publication-date'] || b.createdOn);
            return dateB - dateA;
          });
          setLatestBlog(sorted[0]);
        }
      })
      .catch(error => console.error('Failed to fetch latest blog:', error));
  }, []);

  // Only show the first 2 products
  const previewProducts = products.slice(0, 2);

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <HomeBanner style={styles.homebanner} />
          <Text style={styles.subtitle}>Featured Products</Text>
          <ScrollView 
            contentContainerStyle={styles.productGrid}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {previewProducts.map(product => (
              <TouchableOpacity 
                key={product.id}
                style={styles.productCard} 
                onPress={() => navigation.navigate('Product Detail', {
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
            {/* // View More button  */}
            <TouchableOpacity 
              style={styles.viewMoreButton} 
              onPress={() => navigation.navigate('Products')}
            >
              <Text style={styles.viewMoreText}>View More +++ </Text>
            </TouchableOpacity>
          </ScrollView>
          <Text style={styles.subtitle}>Latest Blog</Text>
          {latestBlog && (
            <BlogRow
              blog={latestBlog}
              onPress={() => navigation.navigate('Blog Detail', { blog: latestBlog })}
              style={{ 
                borderBottomWidth: 0, 
                borderBottomColor: 'transparent',
                paddingLeft: 20,
                
              }}
            />
          )}
        </View>
      
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
  },
  homebanner: {
    width: '100%',
    height: 200,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'Inconsolata_700Bold',
    marginBottom: 10,
    textAlign: 'left',
    paddingLeft: 20,
    color: '#1a1a1a',
  },
  productGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
    marginLeft: 20,
    
  },
  productCard: {
    width: 250,
    marginRight: 20,
  },
  viewMoreButton: {
    marginTop: 20,
    marginBottom: 30,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingRight: 40,
  },
  viewMoreText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  
});

export default HomeScreen;