import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CustomHeader = ({ navigation }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.customHeader}>
      <Text style={styles.headerLogo}>Deskly</Text>
      <TouchableOpacity style={styles.headerWishlist} onPress={() => navigation.navigate('Wishlist')}>
        <AntDesign name="hearto" size={24} color="#e74c3c" />
        <Text style={styles.headerWishlistText}>Wishlist</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f8f8f8',
    // Ensure the header is rendered below the status bar
    paddingTop: 60, // Adjust based on your device's status bar height

  },
  customHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1000,
    // shadows and borders for android and ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    backgroundColor: '#f8f8f8',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  headerLogo: {
    fontSize: 24,
    fontFamily: 'Inconsolata_700Bold',
    color: '#333',
  },
  headerWishlist: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerWishlistText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#e74c3c',
  },
});

export default CustomHeader;
